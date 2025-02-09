import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TObject } from '@sinclair/typebox'
import { RequestHandler } from 'express'

export function validateSchema<RequestParams, ResponseBody, RequestBody>(
  requestSchema: TObject,
  responseSchema: TObject
) {
  const requestValidator = TypeCompiler.Compile(requestSchema)
  const responseValidator = TypeCompiler.Compile(responseSchema)

  return (
    handler: RequestHandler<RequestParams, ResponseBody, RequestBody>
  ): RequestHandler<
    RequestParams,
    ResponseBody | { error: string; issue?: string; data?: any },
    RequestBody
  > => {
    return (req, res, next) => {
      const requestObject = { body: req.body, params: req.params, query: req.query }
      if (!requestValidator.Check(requestObject)) {
        const issue = requestValidator.Errors(requestObject).First()?.message
        res.status(400)
        res.json({ error: 'Invalid request format', issue, data: requestObject })
        return
      }

      const originalJson = res.json.bind(res)
      res.json = (data: any) => {
        if (responseValidator) {
          const responseObject = { body: data }
          const validationResult = responseValidator.Check(responseObject)

          if (!validationResult) {
            const issue = responseValidator.Errors(data).First()?.message
            res.status(500)
            return originalJson({ error: 'Invalid response format', issue, data })
          }
        }

        return originalJson(data)
      }

      handler(req, res, next)
    }
  }
}
