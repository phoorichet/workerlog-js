const defaultUrl = 'https://stage-api.workerlog.dev/log'
const usernameRegEx = /^[0-9A-Fa-f]{40}$/
const projectRegEx = /^[0-9A-Fa-f]{7}$/
const hostnane = 'workerlog.dev'

export class Dsn {
  constructor(dsn) {
    const u = new URL(dsn)
    this._username = u.username
    this._hostname = u.hostname
    this._project = u.pathname.replace(/^\//, '')

    if (!this.isValid()) {
      throw 'Invalid dns'
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

export class Worker {
  constructor(dsn, url = defaultUrl) {
    this._dsn = new Dsn(dsn)
    this._url = new URL(url)
  }

  async log(...msg) {
    console.log(`${new Date().toISOString()} [${this._dsn}]`, ...msg)
    const headers = {
      'User-Agent': 'Workerlog/1.0',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify({
      dsn: this._dsn.toString(),
      ts: new Date().toISOString(),
      msg: msg
    })
    return fetch(this._url.toString(), {
      method: 'POST',
      headers,
      body
    })
  }
}

