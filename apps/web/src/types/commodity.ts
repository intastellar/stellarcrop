import type { CommodityType } from './batch'

export interface CommodityMeta {
  type: CommodityType
  label: string
  unit: string
  defaultDecimals: number
  description: string
  icon: string
}

export const COMMODITY_META: Record<CommodityType, CommodityMeta> = {
  maize: { type: 'maize', label: 'Maize', unit: 'kg', defaultDecimals: 2, description: 'Yellow and white maize grain', icon: 'sprout' },
  rice: { type: 'rice', label: 'Rice', unit: 'kg', defaultDecimals: 2, description: 'Paddy and processed rice', icon: 'wheat' },
  cassava: { type: 'cassava', label: 'Cassava', unit: 'kg', defaultDecimals: 2, description: 'Fresh and dried cassava', icon: 'leaf' },
  soybean: { type: 'soybean', label: 'Soybean', unit: 'kg', defaultDecimals: 2, description: 'Whole soybeans', icon: 'circle-dot' },
  cocoa: { type: 'cocoa', label: 'Cocoa', unit: 'kg', defaultDecimals: 2, description: 'Dried cocoa beans', icon: 'coffee' },
  palm_oil: { type: 'palm_oil', label: 'Palm Oil', unit: 'litres', defaultDecimals: 2, description: 'Crude and refined palm oil', icon: 'droplets' },
  wheat: { type: 'wheat', label: 'Wheat', unit: 'kg', defaultDecimals: 2, description: 'Hard and soft wheat grain', icon: 'wheat' },
  sorghum: { type: 'sorghum', label: 'Sorghum', unit: 'kg', defaultDecimals: 2, description: 'Whole sorghum grain', icon: 'sprout' },
}
