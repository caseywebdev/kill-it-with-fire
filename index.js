const DEFAULTS = {wait: 10000, log: console.error.bind(console), code: 1};

const exit = ({code, log, startedAt}) => {
  const duration = ((Date.now() - startedAt) / 1000).toFixed(2);
  log(`Killed it with fire after waiting ${duration}s`);
  process.exit(code);
};

const fail = er => {
  console.error(er);
  process.exit(1);
};

const waitingForCleanup = () => {
  const handles = process._getActiveHandles();
  for (let i = 0, l = handles.length; i < l; ++i) {
    const handle = handles[i];
    if (handle !== process.stdout && handle !== process.stderr) return true;
  }
  return false;
};

const nextTick = () => new Promise(resolve => setImmediate(resolve));

const waitForIt = options =>
  new Promise(resolve =>
    Date.now() - options.startedAt > options.wait ? resolve(options) :
    waitingForCleanup() ? resolve(nextTick().then(() => waitForIt(options))) :
    null
  );

module.exports = options =>
  waitForIt(Object.assign({startedAt: Date.now()}, DEFAULTS, options))
    .then(exit, fail);
