var killItWithFire = require('./');

setTimeout(function () {
  console.error('NOT KILLED WITH FIRE!');
  process.exit(1);
}, 15000);

setTimeout(function () {
  console.log('I should have time to run!');
}, 1000);

killItWithFire({code: 0});
