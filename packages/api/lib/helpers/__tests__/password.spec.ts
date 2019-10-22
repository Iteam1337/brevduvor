import { createHash, verifyPassword } from '../password'

let pw: string
let hashFromPw: string
let incorrectPw: string
beforeEach(async () => {
  pw = 'correct&Pw!'
  incorrectPw = 'incorrectPw'
  hashFromPw = await createHash(pw)
})

describe('#createHash', () => {
  test('returns a base64 string', async () => {
    const hash = await createHash(pw)

    expect(Buffer.from(Buffer.from(hash, 'base64')).toString('base64')).toEqual(
      hash
    )
  })
})

describe('#verifyPassword', () => {
  test('it returns TRUE if correct', async () => {
    const response = await verifyPassword(pw, hashFromPw)

    expect(response).toEqual(true)
  })

  test('it returns FALSE if incorrect', async () => {
    const response = await verifyPassword(incorrectPw, hashFromPw)

    expect(response).toEqual(false)
  })
})
