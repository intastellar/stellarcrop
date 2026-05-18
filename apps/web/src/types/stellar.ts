export interface TransactionResult {
  txHash: string
  ledger: number
  successful: boolean
}

export interface StellarAsset {
  assetCode: string
  issuerPublicKey: string
  supply: string
  numAccounts: number
  flags: {
    authRequired: boolean
    authRevocable: boolean
    clawbackEnabled: boolean
  }
}
