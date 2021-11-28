import { sm2 } from 'sm-crypto'

export function doEncrypt(str: string): string {
  const publicKey =
    '04f2c06d3bed49b20fddec4d1e62d8bc6e0d0109b352e6f4e4ce3c9d85f037b00a90c579d98a2a9859d63196747e28ec91d6bdd5fa66d6126c4d0033ea6781f102'
  return '04' + sm2.doEncrypt(str, publicKey, 0)
}
