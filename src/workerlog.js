const defaultUrl = 'https://stage-api.workerlog.dev/log'
const usernameRegEx = /^[0-9A-Fa-f]{40}$/
const projectRegEx = /^[0-9A-Fa-f]{7}$/
const hostnane = 'workerlog.dev'
const headers = {
  'User-Agent': 'Workerlog/1.0 (https://workerlog.dev)',
  'Content-Type': 'application/json'
}

// global variable to keep track of fetch event
let _event, _dsn, _url
let _enabled = true

export const init = (event, dsn, url = defaultUrl) => {
  if (!event || event.type !== 'fetch')
    throw 'workerlog: fetch event is required'
  _dsn = new Dsn(dsn)
  _url = new URL(url)
  _event = event
}

export const setEnabled = enabled => {
  _enabled = enabled
}

export const log = (...msg) => {
  if (!_enabled) return
  if (!_event || _event.type != 'fetch')
    throw 'workerlog: fetch event is required. please setup fetch event using init()'

  _event.waitUntil(sendlog(...msg))
}

const sendlog = (...msg) => {
  const data = []
  for (const m of msg) {
    switch (typeof m) {
      case 'string':
        data.push({ t: 'string', v: m })
        break
      case 'number':
        data.push({ t: 'number', v: m })
        break
      case 'boolean':
        data.push({ t: 'boolean', v: m })
        break
      case 'object':
        data.push({ t: 'object', v: m })
        break
      default:
        data.push({ t: 'other', v: m })
        break
    }
  }

  const body = JSON.stringify({
    dsn: _dsn.toString(),
    ts: new Date().toISOString(),
    msg: data
  })

  return fetch(_url.toString(), {
    method: 'POST',
    headers,
    body
  })
}

export const Dsn = class {
  constructor(dsn) {
    const u = new URL(dsn)
    this._username = u.username
    this._hostname = u.hostname
    this._project = u.pathname.replace(/^\//, '')

    if (!this.isValid()) {
      throw 'invalid dsn'
    }
  }

  toString() {
    return `https://${this._username}@${this._hostname}/${this._project}`
  }

  isValid() {
    return (
      usernameRegEx.test(this._username) &&
      projectRegEx.test(this._project) &&
      hostnane === this._hostname
    )
  }
}
