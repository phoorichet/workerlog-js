import  * as workerlog from '../lib/workerlog.js'

const dsn =
  'https://cE0070046F0438F3c20F217FDc72F0281E188893@workerlog.dev/b350Fc2'

workerlog.init({ type: 'fetch' }, dsn)
workerlog.log("hello, worker!")

// TODO: Add cloudflare worker code herer
