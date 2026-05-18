import { create } from 'zustand'
import type { CommodityType } from '../types/batch'

interface CommodityStep { commodityType: CommodityType | null }

interface BatchDetailsStep {
  weightKg: number | null
  grade: string
  harvestDate: string
  expiryDate: string
  description: string
}

interface WarehouseStep {
  warehouseId: string
  cooperativeId: string | null
}

interface DocumentsStep {
  documents: File[]
}

interface TokenParamsStep {
  assetCode: string
  distributorPublicKey: string
}

interface ComplianceStep {
  authRequired: boolean
  authRevocable: boolean
  clawbackEnabled: boolean
}

interface BatchWizardState {
  step: number
  commodity: CommodityStep
  batchDetails: BatchDetailsStep
  warehouse: WarehouseStep
  documents: DocumentsStep
  tokenParams: TokenParamsStep
  compliance: ComplianceStep
  setStep: (step: number) => void
  setCommodity: (v: CommodityStep) => void
  setBatchDetails: (v: BatchDetailsStep) => void
  setWarehouse: (v: WarehouseStep) => void
  setDocuments: (v: DocumentsStep) => void
  setTokenParams: (v: TokenParamsStep) => void
  setCompliance: (v: ComplianceStep) => void
  reset: () => void
}

export const useBatchWizardStore = create<BatchWizardState>(() => ({
  step: 1,
  commodity: { commodityType: null },
  batchDetails: { weightKg: null, grade: '', harvestDate: '', expiryDate: '', description: '' },
  warehouse: { warehouseId: '', cooperativeId: null },
  documents: { documents: [] },
  tokenParams: { assetCode: '', distributorPublicKey: '' },
  compliance: { authRequired: true, authRevocable: true, clawbackEnabled: true },
  setStep: () => { /* TODO: implement */ },
  setCommodity: () => { /* TODO: implement */ },
  setBatchDetails: () => { /* TODO: implement */ },
  setWarehouse: () => { /* TODO: implement */ },
  setDocuments: () => { /* TODO: implement */ },
  setTokenParams: () => { /* TODO: implement */ },
  setCompliance: () => { /* TODO: implement */ },
  reset: () => { /* TODO: implement */ },
}))
