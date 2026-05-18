import { GenericResource, Resource, ResourceCollection } from 'resora'
import { formdata, requestLogger } from '@arkstack/driver-express/middlewares'

import { MiddlewareConfig } from 'src/types/config'
import cors from 'cors'
import express from 'express'
import { useExpressUploadContext } from '@kanun-hq/plugin-file'

const config = (): MiddlewareConfig => {
  return {
    global: [
      // Parse application/json
      express.json(),
      // Parse application/x-www-form-urlencoded (for non-multipart forms)
      express.urlencoded({ extended: true }),
      // Enable CORS for all routes
      cors(),
      formdata.any(),
    ],
    before: [
      (req, res, next) => {
        Resource.setCtx({ req, res })
        GenericResource.setCtx({ req, res })
        ResourceCollection.setCtx({ res, req })
        useExpressUploadContext(req as never)
        next()
      }
    ],
    after: [
      requestLogger()
    ],
  }
}

export default config
