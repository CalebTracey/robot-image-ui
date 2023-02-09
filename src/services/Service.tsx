import axios, { isAxiosError } from 'axios'
import Constants from '../Constants'

interface Props {
  request: RequestI
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

const GetImages = async (props: Props): Promise<ResponseI | null> => {
  const { LocalURL, LocalTestURL, DevURL } = Constants
  const { request } = props
  try {
    const response = await axios.post<ResponseI>(DevURL, request)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    return null
  }
}

const Service = { GetImages }

export default Service
