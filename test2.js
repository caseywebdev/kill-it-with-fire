var killItWithFire = require('./');

setTimeout(function () {
  console.error('NOT KILLED WITH FIRE!');
  process.exit(1);
}, 3000);

setTimeout(function () {
  console.log('I should have time to run!');
}, 1000);

killItWithFire({
  wait: 2000,
  log: console.log.bind(console),
  code: 0
});
