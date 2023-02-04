import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios'

/**
 * * Service - handles the external source calls
 */

const LOCAL_URL = 'http://localhost:8080/v1/image'
const LOCAL_TEST = 'http://localhost:8080/v1/test'
const URL_DEV = 'https://dev-zan4mh2kqq-uk.a.run.app/v1/image'

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
        trace: 'Post: ',
      },
    ],
    status: 'ERROR',
    count: '0',
  },
}

const Post = async (props: Props): Promise<ResponseI> => {
  const { request } = props
  
  return axios
    // set url here for now
    .post(LOCAL_URL, request)
    .then((res: AxiosResponse<ResponseI>) => {
      if (res && res.data) {
        return res.data
      } else {
        return PostError
      }
    })
    .catch((err: AxiosError) => {
      if (isAxiosError(err)) {
        console.error(err)
      }

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
    })
}

const Service = { Post }

export default Service
