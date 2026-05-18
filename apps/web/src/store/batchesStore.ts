import { create } from 'zustand'
import type { Batch, CreateBatchDto } from '../types/batch'

interface BatchesState {
  batches: Batch[]
  selectedBatch: Batch | null
  isLoading: boolean
  fetchBatches: () => Promise<void>
  fetchBatch: (id: string) => Promise<void>
  createBatch: (data: CreateBatchDto) => Promise<void>
  clearSelectedBatch: () => void
}

export const useBatchesStore = create<BatchesState>(() => ({
  batches: [],
  selectedBatch: null,
  isLoading: false,
  fetchBatches: async () => { /* TODO: implement */ },
  fetchBatch: async () => { /* TODO: implement */ },
  createBatch: async () => { /* TODO: implement */ },
  clearSelectedBatch: () => { /* TODO: implement */ },
}))
