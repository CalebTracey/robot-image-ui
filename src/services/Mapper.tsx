import { AxiosError } from 'axios'

const errorResponse = (err: AxiosError): ResponseI => {
  return {
    result: { created: 0, data: [] },
    message: {
      errorLog: [
        {
          scope: 'Service',
          statusCode: err?.code !== undefined ? err.code : '500',
          rootCause:
            err?.cause?.message !== undefined
              ? err.cause.message
              : 'Post request failed',
          trace: 'Post: ',
        },
      ],
      status: 'ERROR',
      count: '0',
    },
  }
}

const Mapper = { errorResponse }

export default Mapper
