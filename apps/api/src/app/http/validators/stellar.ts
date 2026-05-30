import { StrKey } from '@stellar/stellar-sdk'

export type StellarAddressField =
  | 'operatorAddress'
  | 'warehouseAddress'
  | 'distributorPublicKey'
  | 'investorAddress'
  | 'cooperativeTreasuryAddress'
  | 'address'

export type ValidationErrorCode =
  | 'invalid_type'
  | 'invalid_stellar_address'
  | 'missing_field'
  | 'unsafe_value'
  | 'unknown_field'

export interface FieldValidationError {
  field: string
  code: ValidationErrorCode
  message: string
}

export type ValidationResult<T> =
  | {
      ok: true
      data: T
      errors: []
    }
  | {
      ok: false
      errors: FieldValidationError[]
    }

type FieldSpec = {
  field: StellarAddressField
  required?: boolean
}

type ValidatedAddressPayload<TSpec extends readonly FieldSpec[]> = {
  [K in TSpec[number]['field']]?: string
}

const operatorAddressSpecs = [{ field: 'operatorAddress' }] as const
const warehouseAddressSpecs = [{ field: 'warehouseAddress' }] as const
const distributorAddressSpecs = [{ field: 'distributorPublicKey' }] as const
const investorAddressSpecs = [{ field: 'investorAddress' }] as const
const cooperativeTreasurySpecs = [{ field: 'cooperativeTreasuryAddress' }] as const

export function validateOperatorAddressPayload(
  input: unknown
): ValidationResult<{ operatorAddress?: string }> {
  return validateStellarAddressPayload(input, operatorAddressSpecs)
}

export function validateWarehouseAddressPayload(
  input: unknown
): ValidationResult<{ warehouseAddress?: string }> {
  return validateStellarAddressPayload(input, warehouseAddressSpecs)
}

export function validateDistributorAddressPayload(
  input: unknown
): ValidationResult<{ distributorPublicKey?: string }> {
  return validateStellarAddressPayload(input, distributorAddressSpecs)
}

export function validateInvestorAddressPayload(
  input: unknown
): ValidationResult<{ investorAddress?: string }> {
  return validateStellarAddressPayload(input, investorAddressSpecs)
}

export function validateCooperativeTreasuryPayload(
  input: unknown
): ValidationResult<{ cooperativeTreasuryAddress?: string }> {
  return validateStellarAddressPayload(input, cooperativeTreasurySpecs)
}

export function validateRouteAddress(address: unknown): ValidationResult<string> {
  return validateStellarPublicKey(address, 'address')
}

export function validateStellarAddressPayload<TSpec extends readonly FieldSpec[]>(
  input: unknown,
  specs: TSpec
): ValidationResult<ValidatedAddressPayload<TSpec>> {
  if (!isRecord(input)) {
    return {
      ok: false,
      errors: [{ field: '$', code: 'invalid_type', message: 'Payload must be an object' }],
    }
  }

  const allowedFields = new Set(specs.map((spec) => spec.field))
  const errors: FieldValidationError[] = []
  const data: ValidatedAddressPayload<TSpec> = {}

  for (const field of Object.keys(input)) {
    if (!allowedFields.has(field as StellarAddressField)) {
      errors.push({ field, code: 'unknown_field', message: `${field} is not allowed` })
    }
  }

  for (const spec of specs) {
    const value = input[spec.field]
    const required = spec.required ?? true

    if (value === undefined || value === null) {
      if (required) {
        errors.push({
          field: spec.field,
          code: 'missing_field',
          message: `${spec.field} is required`,
        })
      }
      continue
    }

    const result = validateStellarPublicKey(value, spec.field)
    if (result.ok) {
      data[spec.field as TSpec[number]['field']] = result.data
    } else {
      errors.push(...result.errors)
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, data, errors: [] }
}

export function validateStellarPublicKey(value: unknown, field: string): ValidationResult<string> {
  if (typeof value !== 'string') {
    return invalid(field, 'invalid_type', `${field} must be a string`)
  }

  if (value.length === 0) {
    return invalid(field, 'missing_field', `${field} is required`)
  }

  if (value !== value.trim()) {
    return invalid(field, 'unsafe_value', `${field} cannot include whitespace`)
  }

  if (!StrKey.isValidEd25519PublicKey(value)) {
    return invalid(field, 'invalid_stellar_address', `${field} must be a valid Stellar public key`)
  }

  return { ok: true, data: value, errors: [] }
}

function invalid(
  field: string,
  code: ValidationErrorCode,
  message: string
): ValidationResult<string> {
  return { ok: false, errors: [{ field, code, message }] }
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}
