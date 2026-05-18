export type CommodityType =
  | 'maize' | 'rice' | 'cassava' | 'soybean'
  | 'cocoa' | 'palm_oil' | 'wheat' | 'sorghum'

export type BatchStatus =
  | 'registered' | 'tokenized' | 'active'
  | 'settled' | 'redeemed' | 'expired'

export interface Batch {
  id: string
  commodityType: CommodityType
  weightKg: number
  grade: string
  harvestDate: string
  expiryDate: string
  assetCode: string | null
  issuerPublicKey: string | null
  status: BatchStatus
  warehouseId: string
  warehouseName: string
  warehouseLocation: string
  cooperativeId: string | null
  description: string | null
  createdAt: string
  updatedAt: string
}

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
