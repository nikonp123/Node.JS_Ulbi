const os = require('os');
const cluster = require('cluster');

console.log(os.cpus().length);
if (cluster.isMaster) {
  for (let index = 0; index < os.cpus().length - 2; index++) {
    cluster.fork();
    cluster.on('exit', (worker) => {
      console.log(`Worker with pid ${worker.process.pid} killed!`);
      cluster.fork();
    });
  }
} else {
  console.log(`Воркер с pid ${process.pid} запущен`);
  setInterval(() => {
    console.log(`Воркер с pid ${process.pid} еще работает`);
  }, 5000);
}
