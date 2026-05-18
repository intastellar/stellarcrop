export type SettlementCurrency = 'USDC' | 'XLM'

export interface SettlementEvent {
  id: string
  batchId: string
  assetCode: string
  saleProceedsAmount: string
  settlementCurrency: SettlementCurrency
  holderCount: number
  txHash: string | null
  settledAt: string
}

export interface RedemptionRequest {
  id: string
  batchId: string
  investorAddress: string
  quantityKg: number
  deliveryAddress: string
  requestedDate: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  voucherHash: string | null
  createdAt: string
}
