![KILL IT WITH FIRE](https://camo.githubusercontent.com/df2f105712b43eadbdbafbbaffd316ca27d41f96/68747470733a2f2f636c617373616e64747261736873686f772e66696c65732e776f726470726573732e636f6d2f323031342f30352f666972652e676966)

## Install

```
npm install kill-it-with-fire
```

## Usage

```js
var killItWithFire = require('kill-it-with-fire');

process.on('SIGTERM', function () {
  // Do the stuff that *should* let your process exit cleanly...
  sockets.closeEm();
  server.stopIt();
  connections.breakUpWith();

  // And usually that works fine...but when something is still hanging...
  killItWithFire();

  // Alternatively, you can pass options to `killItWithFire()`.
  killItWithFire({wait: 5000})
});
```

## `killItWithFire(options)`

#### `wait` (default `10000`)

The time (in ms) to wait before killing it with fire.

#### `cb` (default `log` the death and exit with `code`)

A callback to be fired (pun intended) when it's time to get cooking. The
callback is passed the options object for convenience. You **MUST** call
`process.exit` in the callback, otherwise, you're doing it wrong.

#### `log` (default `console.error.bind(console)`)

A function to use to log the immolation. Used by the default `cb`.

#### `code` (default `1`)

The code to exit the process with. Used by the default `cb`.
