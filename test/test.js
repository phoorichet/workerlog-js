const { Worker } = require('../lib/workerlog.js')
const assert = require('assert')

describe('Worker', () => {
  it('should validate DSN before creating a new instance', () => {
    const goodDsns = [
      'https://4F111da912f18eBA1218a2E31c67F5d75E06f61c@workerlog.dev/928A42a'
    ]
    for (const dsn of goodDsns) {
      const w1 = new Worker(dsn)
      assert.equal(w1._dsn.toString(), dsn)
    }
  })

  it('should throw error for bad DSN', () => {
    const badDsns = [
      'https://4F111da912f18eBA1218a2@workerlog.dev/928A42a',
      '://4F111da912f18eBA1218a2@workerlog.dev/928A42a',
      '://4F111da912f18eBA1218a2@workerlog.dev',
      'https://workerlog.dev/928A42a',
      'https://workerlog.dev'
    ]

    for (const dsn of badDsns) {
      assert.throws(() => {
        new Worker(dsn)
      }, `bad dsn should be thrown: ${dsn}`)
    }
  })
})
