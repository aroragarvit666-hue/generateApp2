const { Core } = require('@adobe/aio-sdk')

async function main(params) {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  try {
    logger.info('Action invoked')
    logger.debug('Params:', JSON.stringify(params))

    // The caller may optionally send a name; default to "World"
    const name = params.name || 'World'

    // Extract IMS token (present when require-adobe-auth: true)
    const token = params.__ow_headers?.authorization?.replace('Bearer ', '')
    logger.debug('Authenticated request:', Boolean(token))

    const result = {
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString()
    }

    logger.info('Action completed successfully')
    return { statusCode: 200, body: result }
  } catch (error) {
    logger.error('Action failed:', error.message)
    return { statusCode: 500, body: { error: error.message } }
  }
}

exports.main = main
