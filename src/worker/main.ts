import Web3 from 'web3';
import { Buffer } from 'buffer';

import { START_BLOCK, BLOCK_RANGE } from '../../config';
import { NODES } from '../../config/nodes';
import mainABI from '../../abi/main.json';
import { Contracts } from '../../config/contracts';
import { getRandomElement } from '../../lib/array';
import { orm } from '../data-source';
import { Block } from '../entity/block';

const provider = getRandomElement(NODES);
const web3 = new Web3(provider);


(async function(){
  await orm.initialize();

  const lastblock = await web3.eth.getBlockNumber();
  let storedBlock = await orm.getRepository(Block).findOneBy({});

  if (!storedBlock) {
    storedBlock = new Block(START_BLOCK);

    await orm.getRepository(Block).save(storedBlock);
  }

  const abi = JSON.parse(JSON.stringify(mainABI));
  const main = new web3.eth.Contract(abi, Contracts.Main);
  const fromBlock = storedBlock.blocknumber;
  const toBlock = (Number(lastblock) < fromBlock + BLOCK_RANGE) ?
    Number(lastblock) : fromBlock + BLOCK_RANGE;
  const res = await main.getPastEvents('Transfer', {
    fromBlock,
    toBlock
  });

  console.log(JSON.stringify(res, null, 4));
}());