import { Dsn } from '../lib/workerlog.js'
import assert from 'assert'

describe('Dns', () => {
  it('should be validated before creating a new instance', () => {
    const goodDsns = [
      'https://4F111da912f18eBA1218a2E31c67F5d75E06f61c@workerlog.dev/928A42a'
    ]
    for (const goodDsn of goodDsns) {
      const d = new Dsn(goodDsn)
      assert.equal(d.toString(), goodDsn)
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

    for (const badDsn of badDsns) {
      assert.throws(() => {
        new Dsn(badDsn)
      }, `bad dsn should be thrown: ${badDsn}`)
    }
  })
})
