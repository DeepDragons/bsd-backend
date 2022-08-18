import { Worker } from 'worker_threads';
import path from 'path';

(function(){
  new Worker(path.join(__dirname, './src/tasks/server.js'));
  new Worker(path.join(__dirname, './src/tasks/worker.js'));
}());
