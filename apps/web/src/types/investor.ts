export interface Investor {
  address: string
  balance: string
  trustlineStatus: 'authorized' | 'frozen' | 'pending'
  kycStatus: 'pending' | 'passed' | 'failed'
  approvedAt: string | null
}

export interface Portfolio {
  totalBatches: number
  totalInvested: string
  holdings: PortfolioHolding[]
}

export interface PortfolioHolding {
  batchId: string
  assetCode: string
  commodityType: string
  balance: string
  estimatedValue: string | null
  batchStatus: string
}
