import { Keypair } from '@stellar/stellar-sdk'
import { describe, expect, it } from 'vitest'

import {
  validateCooperativeTreasuryPayload,
  validateDistributorAddressPayload,
  validateInvestorAddressPayload,
  validateOperatorAddressPayload,
  validateRouteAddress,
  validateStellarAddressPayload,
  validateWarehouseAddressPayload,
} from '../src/app/http/validators/stellar'

const publicKey = () => Keypair.random().publicKey()

describe('API Stellar address validators', () => {
  it('accepts domain address DTOs and preserves field names', () => {
    const operatorAddress = publicKey()
    const warehouseAddress = publicKey()
    const distributorPublicKey = publicKey()
    const investorAddress = publicKey()
    const cooperativeTreasuryAddress = publicKey()

    expect(validateOperatorAddressPayload({ operatorAddress })).toMatchObject({
      ok: true,
      data: { operatorAddress },
    })
    expect(validateWarehouseAddressPayload({ warehouseAddress })).toMatchObject({
      ok: true,
      data: { warehouseAddress },
    })
    expect(validateDistributorAddressPayload({ distributorPublicKey })).toMatchObject({
      ok: true,
      data: { distributorPublicKey },
    })
    expect(validateInvestorAddressPayload({ investorAddress })).toMatchObject({
      ok: true,
      data: { investorAddress },
    })
    expect(validateCooperativeTreasuryPayload({ cooperativeTreasuryAddress })).toMatchObject({
      ok: true,
      data: { cooperativeTreasuryAddress },
    })
    expect(validateRouteAddress(investorAddress)).toMatchObject({ ok: true, data: investorAddress })
  })

  it('rejects invalid, unsafe, missing, and unknown fields with field-level errors', () => {
    expect(validateInvestorAddressPayload({ investorAddress: 'bad' })).toMatchObject({
      ok: false,
      errors: [{ field: 'investorAddress', code: 'invalid_stellar_address' }],
    })
    expect(
      validateDistributorAddressPayload({ distributorPublicKey: ` ${publicKey()}` })
    ).toMatchObject({
      ok: false,
      errors: [{ field: 'distributorPublicKey', code: 'unsafe_value' }],
    })
    expect(validateWarehouseAddressPayload({ warehouseAddress: null })).toMatchObject({
      ok: false,
      errors: [{ field: 'warehouseAddress', code: 'missing_field' }],
    })
    expect(
      validateOperatorAddressPayload({ operatorAddress: publicKey(), admin: true })
    ).toMatchObject({
      ok: false,
      errors: [{ field: 'admin', code: 'unknown_field' }],
    })
  })

  it('supports exact multi-field validator definitions', () => {
    const result = validateStellarAddressPayload(
      {
        operatorAddress: publicKey(),
        warehouseAddress: publicKey(),
      },
      [{ field: 'operatorAddress' }, { field: 'warehouseAddress' }] as const
    )

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.operatorAddress).toBeDefined()
      expect(result.data.warehouseAddress).toBeDefined()
    }
  })
})
