import { Keypair } from '@stellar/stellar-sdk'
import { describe, expect, it } from 'vitest'

import {
  isValidStellarPublicKey,
  validateCooperativeAddresses,
  validateInvestorAddresses,
  validateOperatorAddresses,
  validateStellarPublicKey,
  validateTokenParamsAddresses,
  validateWarehouseAddresses,
} from './stellar'

const publicKey = () => Keypair.random().publicKey()

describe('web Stellar address helpers', () => {
  it('validates public keys with the Stellar SDK StrKey parser', () => {
    const address = publicKey()

    expect(isValidStellarPublicKey(address)).toBe(true)
    expect(validateStellarPublicKey(address, 'address')).toMatchObject({ ok: true, data: address })
    expect(validateStellarPublicKey('not-a-key', 'address')).toMatchObject({
      ok: false,
      errors: [{ field: 'address', code: 'invalid_stellar_address' }],
    })
  })

  it('validates wizard and investor address payloads with field-level errors', () => {
    const distributorPublicKey = publicKey()
    const cooperativeTreasuryAddress = publicKey()
    const investorAddress = publicKey()
    const operatorAddress = publicKey()
    const warehouseAddress = publicKey()

    expect(validateTokenParamsAddresses({ distributorPublicKey })).toMatchObject({
      ok: true,
      data: { distributorPublicKey },
    })
    expect(validateCooperativeAddresses({ cooperativeTreasuryAddress })).toMatchObject({
      ok: true,
      data: { cooperativeTreasuryAddress },
    })
    expect(validateInvestorAddresses({ investorAddress })).toMatchObject({
      ok: true,
      data: { investorAddress },
    })
    expect(validateOperatorAddresses({ operatorAddress })).toMatchObject({
      ok: true,
      data: { operatorAddress },
    })
    expect(validateWarehouseAddresses({ warehouseAddress })).toMatchObject({
      ok: true,
      data: { warehouseAddress },
    })
  })

  it('rejects unsafe whitespace, null values, and unknown fields', () => {
    expect(validateTokenParamsAddresses({ distributorPublicKey: `${publicKey()} ` })).toMatchObject(
      {
        ok: false,
        errors: [{ field: 'distributorPublicKey', code: 'unsafe_value' }],
      }
    )
    expect(validateInvestorAddresses({ investorAddress: null })).toMatchObject({
      ok: false,
      errors: [{ field: 'investorAddress', code: 'missing_field' }],
    })
    expect(
      validateCooperativeAddresses({ cooperativeTreasuryAddress: publicKey(), role: 'admin' })
    ).toMatchObject({
      ok: false,
      errors: [{ field: 'role', code: 'unknown_field' }],
    })
  })
})
