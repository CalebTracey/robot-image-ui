import axios, { AxiosError, isAxiosError } from 'axios'
import Constants from '../Constants'

const { LocalURL, LocalTestURL, DevURL } = Constants
interface Props {
  request: RequestI
}

const newErrorResponse = (cause: string): ResponseI => {
  return {
    result: { created: 0, data: [] },
    message: {
      errorLog: [
        {
          scope: 'Service',
          statusCode: '500',
          rootCause: cause,
          trace: 'Post: error',
        },
      ],
      status: 'ERROR',
      count: '0',
    },
  }
}
const PostError: ResponseI = {
  result: { created: 0, data: [] },
  message: {
    errorLog: [
      {
        scope: 'Service',
        statusCode: '500',
        rootCause: 'Post request failed',
        trace: 'Post: error',
      },
    ],
    status: 'ERROR',
    count: '0',
  },
}

const GetImages = async (props: Props): Promise<ResponseI> => {
  const { request } = props
  try {
    const response = await axios.post<ResponseI>(DevURL, request)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message)
      return newErrorResponse(error.cause ? error.cause.message : error.message)
    } else {
      console.error(error)
      return newErrorResponse(JSON.stringify(error))
    }
  }
}

const Service = { GetImages }

export default Service
