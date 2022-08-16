import Web3 from 'web3';
import { Buffer } from 'buffer';

import { NODES } from '../../config/nodes';
import mainABI from '../../abi/main.json';
import { Contracts } from '../../config/contracts';

const web3 = new Web3(NODES[1]);


(async function(){
  // web3.eth.subscribe('logs', {
  //   address: Contracts.Main
  // }, console.log);

  // const value = await web3.eth.getStorageAt(Contracts.Main, 1);
  // const buf = Buffer.from(value);
  // console.log(value, Array.from(buf));

  const abi = JSON.parse(JSON.stringify(mainABI));
  const main = new web3.eth.Contract(abi, Contracts.Main);

  // main.events.Transfer({
  //   fromBlock: '19879594',
  //   toBlock: '19879994'
  // }, console.log);

  const res = await main.getPastEvents('Transfer', {
    fromBlock: '19879594',
    toBlock: '21049860'
  });

  console.log(JSON.stringify(res, null, 4));
}());
