var DEFAULTS = {
  wait: 10000,
  log: console.error.bind(console),
  code: 1,
  cb: function (options) {
    options.log('Killed it with fire after waiting ' + options.wait + 'ms');
    process.exit(options.code);
  }
};

var extend = function (obj) {
  return [].slice.call(arguments, 1).reduce(function (obj, other) {
    Object.keys(other).forEach(function (key) { obj[key] = other[key]; });
    return obj;
  }, obj);
};

var waitForIt = function (options) {
  var wait = Date.now() - options.start;
  if (wait > options.wait) return options.cb(options);
  if (!process._getActiveHandles().length) return;
  setImmediate(waitForIt.bind(this, options));
};

module.exports = function (options) {
  waitForIt(extend({start: Date.now()}, DEFAULTS, options || {}));
};
