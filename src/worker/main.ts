import type { TransferEvent } from 'types';

import Web3 from 'web3';
import bunyan from 'bunyan';

import { START_BLOCK, BLOCK_RANGE } from '../../config';
import { NODES } from '../../config/nodes';
import mainABI from '../../abi/main.json';
import { Contracts } from '../../config/contracts';
import { getRandomElement } from '../../lib/array';
import { orm } from '../data-source';
import { Block } from '../entity/block';
import { Token } from '../entity/token';
import { parseGetDragons } from '../../lib/parse-res';


const provider = getRandomElement(NODES);
const web3 = new Web3(provider);
const log = bunyan.createLogger({
  name: "MAIN-EVENTS"
});


(async function(){
  await orm.initialize();

  const abi = JSON.parse(JSON.stringify(mainABI));
  const main = new web3.eth.Contract(abi, Contracts.Main);
  const tokenRepo = orm.getRepository(Token);
  const blockRepo = orm.getRepository(Block);


  /**
   * fun fech and write new tokens minted.
   * @param events - List events for create new tokens.
   */
  async function createTokens(events: TransferEvent[]) {
    if (events.length === 0) {
      return;
    }

    log.info(`createTokens ${events.length} start fetch`);

    const ids = events.map((e) => e.tokenId);

    const res = await main.methods.getDragons(ids).call();
    const list = parseGetDragons(events, res);
    const dragons: Token[] = list.map((t) => new Token(
      Number(t.id),
      t.visual,
      t.combat,
      t.owner,
      t.action,
      t.rarity,
      t.strong,
      t.name
    ));

    await tokenRepo.save(dragons);
  }

  async function transferTokens(events: TransferEvent[]) {
    if (events.length === 0) {
      return;
    }

    log.info(`transferTokens ${events.length} start udpate`);

    const ids = events.map((e) => Number(e.tokenId));
    const tokens = await tokenRepo.find({
      where: ids.map((id) => ({
        id
      }))
    });

    for (const token of tokens) {
      const newOwner = events.find((e) => Number(e.tokenId) === token.id);

      if (newOwner) {
        token.owner = newOwner.to;
      }
    }

    await tokenRepo.save(tokens);
  }

  async function updateBlocks(from: number, to: number) {
    const newBlocks = [];

    for (let index = from; index < to; index++) {
      newBlocks.push(new Block(
        index
      ));
    }

    log.info(`created ${newBlocks.length} blocks`);

    await blockRepo.save(newBlocks);
  }

  const lastblock = await web3.eth.getBlockNumber();
  let storedBlock = await blockRepo.findOne({
    where: {},
    order: { blocknumber: 'DESC' }
  });

  if (Number(lastblock) === storedBlock?.blocknumber) {
    log.info('state already updated');
    return;
  }

  if (!storedBlock) {
    storedBlock = new Block(START_BLOCK);

    await blockRepo.save(storedBlock);
  }

  const fromBlock = storedBlock.blocknumber;
  const toBlock = (Number(lastblock) < fromBlock + BLOCK_RANGE) ?
    Number(lastblock) : fromBlock + BLOCK_RANGE;

  log.info(`start fetch from blocknumber ${fromBlock} to blocknumber ${toBlock}`);

  const transferEventsList = await main.getPastEvents('Transfer', {
    fromBlock,
    toBlock
  });

  log.info(`got ${transferEventsList.length} new events`);

  if (transferEventsList.length === 0) {
    try {
      await updateBlocks(fromBlock, toBlock);
    } catch (err) {
      log.error('updateBlocks', err);
    }
    return;
  }

  const events = transferEventsList.map((e) => e.returnValues as TransferEvent);
  const minted = events.filter((t) => t.from === Contracts.NIL);
  const transfered = events.filter((t) => t.from !== Contracts.NIL);

  try {
    await createTokens(minted);
    await transferTokens(transfered);

    await updateBlocks(fromBlock, toBlock);
  } catch (err) {
    log.error(err);
  }
}());
