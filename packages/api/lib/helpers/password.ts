import { kdf, pickParams, verify } from 'scrypt-kdf'

export async function verifyPassword(
  pw: string,
  hash: string
): Promise<boolean> {
  const keyBuf = Buffer.from(hash, 'base64')

  return verify(keyBuf, pw)
}

export async function createHash(pw: string): Promise<string> {
  const params = await pickParams(0.1)

  return (await kdf(pw, params)).toString('base64')
}
