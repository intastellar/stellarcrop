import { ofetch } from 'ofetch'

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
type RequestBody = Record<string, unknown> | BodyInit | null | undefined

export const api = ofetch.create({ baseURL })

// Batch endpoints - TODO: implement call bodies
export const batchApi = {
  list: () => api('/api/batches'),
  get: (id: string) => api(`/api/batches/${id}`),
  create: (data: RequestBody) => api('/api/batches', { method: 'POST', body: data }),
  tokenize: (id: string, data: RequestBody) => api(`/api/batches/${id}/tokenize`, { method: 'POST', body: data }),
  settle: (id: string, data: RequestBody) => api(`/api/batches/${id}/settle`, { method: 'POST', body: data }),
  publicList: () => api('/api/invest/batches'),
  publicGet: (id: string) => api(`/api/invest/batches/${id}`),
  purchase: (id: string, data: RequestBody) => api(`/api/invest/batches/${id}/purchase`, { method: 'POST', body: data }),
}

export const investorApi = {
  portfolio: () => api('/api/invest/portfolio'),
  approve: (batchId: string, address: string) => api(`/api/batches/${batchId}/investors/${address}/approve`, { method: 'POST' }),
}

export const settlementApi = {
  list: () => api('/api/settlements'),
}

export const redemptionApi = {
  list: () => api('/api/redemptions'),
  request: (batchId: string, data: RequestBody) => api(`/api/invest/batches/${batchId}/redeem`, { method: 'POST', body: data }),
  approve: (id: string) => api(`/api/redemptions/${id}/approve`, { method: 'PATCH' }),
  reject: (id: string) => api(`/api/redemptions/${id}/reject`, { method: 'PATCH' }),
}
