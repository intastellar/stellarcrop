import { create } from 'zustand'
import {
  getNetwork,
  isAllowed,
  isConnected,
  requestAccess,
  setAllowed,
} from '@stellar/freighter-api'

export type WalletNetwork = 'mainnet' | 'testnet'

interface WalletState {
  publicKey: string | null
  network: WalletNetwork
  networkPassphrase: string | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
  setNetwork: (network: WalletNetwork) => void
  clearError: () => void
}

function normalizeNetwork(network?: string): WalletNetwork {
  const normalized = network?.toLowerCase() || ''

  if (normalized.includes('public') || normalized.includes('main')) {
    return 'mainnet'
  }

  return 'testnet'
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Unable to connect to Freighter.'
}

function assertBrowserWallet() {
  if (typeof window === 'undefined') {
    throw new Error('Wallet connection is only available in the browser.')
  }
}

export const useWalletStore = create<WalletState>((set) => ({
  publicKey: null,
  network: 'testnet',
  networkPassphrase: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  connect: async () => {
    set({ isConnecting: true, error: null })

    try {
      assertBrowserWallet()

      const connection = await isConnected()
      if (connection.error) throw connection.error
      if (!connection.isConnected) {
        throw new Error('Freighter is not installed or is unavailable.')
      }

      const allowed = await isAllowed()
      if (allowed.error) throw allowed.error

      if (!allowed.isAllowed) {
        const approval = await setAllowed()
        if (approval.error) throw approval.error
        if (!approval.isAllowed) {
          throw new Error('Freighter access was not approved.')
        }
      }

      const access = await requestAccess()
      if (access.error) throw access.error
      if (!access.address) {
        throw new Error('Freighter did not return a public key.')
      }

      const networkDetails = await getNetwork()
      if (networkDetails.error) throw networkDetails.error

      set({
        publicKey: access.address,
        network: normalizeNetwork(networkDetails.network),
        networkPassphrase: networkDetails.networkPassphrase,
        isConnected: true,
        isConnecting: false,
        error: null,
      })
    } catch (error) {
      set({
        publicKey: null,
        networkPassphrase: null,
        isConnected: false,
        isConnecting: false,
        error: getErrorMessage(error),
      })
    }
  },
  disconnect: () => {
    set({
      publicKey: null,
      networkPassphrase: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    })
  },
  setNetwork: (network) => {
    set({ network, error: null })
  },
  clearError: () => {
    set({ error: null })
  },
}))
