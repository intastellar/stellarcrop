export type CommodityType =
  | 'maize'
  | 'rice'
  | 'cassava'
  | 'soybean'
  | 'cocoa'
  | 'palm_oil'
  | 'wheat'
  | 'sorghum'

export type BatchStatus =
  | 'registered'
  | 'tokenized'
  | 'active'
  | 'settled'
  | 'redeemed'
  | 'expired'

export type DocumentType =
  | 'warehouse_receipt'
  | 'grading_certificate'
  | 'phytosanitary_certificate'
  | 'other'

export type RedemptionStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export type SettlementCurrency = 'USDC' | 'XLM'

export interface CreateBatchDto {
  commodityType: CommodityType
  weightKg: number
  grade: string
  harvestDate: string
  expiryDate: string
  warehouseId: string
  cooperativeId?: string
  description?: string
}

export interface TokenizeDto {
  assetCode: string
  issuerPublicKey: string
  distributorPublicKey?: string
}

export interface SettleDto {
  saleProceedsAmount: string
  settlementCurrency: SettlementCurrency
  buyerReference?: string
}

export interface RedemptionDto {
  quantityKg: number
  deliveryAddress: string
  requestedDate: string
}

export interface BulkApproveDto {
  addresses: string[]
}

export interface TransactionResult {
  txHash: string
  ledger: number
  successful: boolean
}

export interface HorizonHolder {
  address: string
  balance: string
  trustlineStatus: 'authorized' | 'frozen' | 'pending'
}
