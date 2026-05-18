import { create } from 'zustand'

interface WalletState {
  publicKey: string | null
  network: 'mainnet' | 'testnet'
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  setNetwork: (network: 'mainnet' | 'testnet') => void
}

export const useWalletStore = create<WalletState>(() => ({
  publicKey: null,
  network: 'testnet',
  isConnecting: false,
  connect: async () => { /* TODO: implement via @stellar/freighter-api */ },
  disconnect: () => { /* TODO: implement */ },
  setNetwork: () => { /* TODO: implement */ },
}))
