import BatchesController from '@app/http/controllers/BatchesController'
import CooperativesController from '@app/http/controllers/CooperativesController'
import DocumentsController from '@app/http/controllers/DocumentsController'
import InvestorsController from '@app/http/controllers/InvestorsController'
import { OperatorMiddleware } from 'src/app/http/middlewares/OperatorMiddleware'
import RedemptionsController from '@app/http/controllers/RedemptionsController'
import { Router } from '@arkstack/driver-express'
import SettlementsController from '@app/http/controllers/SettlementsController'
import TomlController from '@app/http/controllers/TomlController'
import WebhooksController from '@app/http/controllers/WebhooksController'
import { auth } from '@arkstack/driver-express/middlewares'

// Public
Router.post('/webhooks/kyc', [WebhooksController, 'kyc'])

// Operator routes (auth + operator middleware)
Router.group('/', () => {
  Router.apiResource('/batches', BatchesController)

  // Batch lifecycle transitions
  Router.post('/batches/:id/tokenize', [BatchesController, 'tokenize'])
  Router.post('/batches/:id/settle', [BatchesController, 'settle'])
  Router.post('/batches/:id/expire', [BatchesController, 'expire'])

  // Batch documents
  Router.get('/batches/:id/documents', [DocumentsController, 'index'])
  Router.post('/batches/:id/documents', [DocumentsController, 'store'])
  Router.delete('/batches/:id/documents/:docId', [DocumentsController, 'destroy'])

  // Investors (operator manages allowlist)
  Router.get('/batches/:id/investors', [InvestorsController, 'index'])
  Router.post('/batches/:id/investors/:address/approve', [InvestorsController, 'approve'])
  Router.post('/batches/:id/investors/:address/revoke', [InvestorsController, 'revoke'])
  Router.post('/batches/:id/investors/:address/freeze', [InvestorsController, 'freeze'])
  Router.post('/batches/:id/investors/bulk-approve', [InvestorsController, 'bulkApprove'])

  // Settlements
  Router.apiResource('/settlements', SettlementsController)

  // Redemptions
  Router.get('/redemptions', [RedemptionsController, 'index'])
  Router.patch('/redemptions/:id/approve', [RedemptionsController, 'approve'])
  Router.patch('/redemptions/:id/reject', [RedemptionsController, 'reject'])

  // Cooperatives
  Router.apiResource('/cooperatives', CooperativesController)

  // TOML
  Router.post('/toml/generate', [TomlController, 'generate'])
  Router.get('/toml/preview', [TomlController, 'preview'])
}, [auth, OperatorMiddleware.handle])

// Investor-facing routes (auth only, no operator middleware)
Router.group('/invest', () => {
  Router.get('/batches', [BatchesController, 'publicIndex'])
  Router.get('/batches/:id', [BatchesController, 'publicShow'])
  Router.post('/batches/:id/purchase', [BatchesController, 'purchase'])
  Router.post('/batches/:id/redeem', [RedemptionsController, 'store'])
  Router.get('/portfolio', [InvestorsController, 'portfolio'])
}, [auth])