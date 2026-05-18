import { create } from 'zustand'
import type { Investor, Portfolio } from '../types/investor'

interface InvestorState {
  investors: Investor[]
  portfolio: Portfolio | null
  isLoading: boolean
  fetchInvestors: (batchId: string) => Promise<void>
  fetchPortfolio: () => Promise<void>
  approveInvestor: (batchId: string, address: string) => Promise<void>
}

export const useInvestorStore = create<InvestorState>(() => ({
  investors: [],
  portfolio: null,
  isLoading: false,
  fetchInvestors: async () => { /* TODO: implement */ },
  fetchPortfolio: async () => { /* TODO: implement */ },
  approveInvestor: async () => { /* TODO: implement */ },
}))
