import { logger } from 'firebase-functions'
import * as functions from 'firebase-functions'
import next from 'next'
import * as path from 'path'

type Built<T> = functions.CloudFunction<T> | functions.HttpsFunction
type Builder<T> = (builder: functions.FunctionBuilder) => Built<T>
type Configurator = (
  builder: functions.FunctionBuilder
) => functions.FunctionBuilder

export default function functionsBuilder<T>(
  f: Builder<T>
): (g: Configurator) => Built<T> {
  return (g) => f(g(functions.runWith({})))
}

// constants
const app = next({
  dev: false,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` },
})
const handle = app.getRequestHandler()

// SSR function
export const ssr = functionsBuilder((f) =>
  f.https.onRequest(async (req, res) => {
    logger.log(`File: ${req.originalUrl}`)
    res.set('X-Frame-Options', 'deny')
    res.set(
      'Content-Security-Policy',
      "default-src 'self' https: 'unsafe-inline'; img-src https: data:"
    )

    await app.prepare()
    const beforeTimeHandle = new Date().getTime()
    await handle(req, res)
    const afterTimeHandle = new Date().getTime()
    logger.log(`handle time: ${afterTimeHandle - beforeTimeHandle}`)
    return
  })
)((f) => f.runWith({ memory: '1GB' }))
