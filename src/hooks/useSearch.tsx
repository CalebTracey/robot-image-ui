import { useCallback, useState } from 'react'
import Constants from '../Constants'
import { ServiceI } from './useService'

type SearchBarResponseT = [SearchBarT, SearchBarI]

export type SearchBarT = {
    isSearchLoading: boolean
    Input: string
    Location: SearchBarLocT
}

export interface SearchBarI {
    onSubmit: (e: SubmitEventT, service: ServiceI) => Promise<ResponseI | null>
    onInputChange: (e: InputEventT) => void
    onReset: () => void
}

export const InitialSearchState: SearchBarT = {
    isSearchLoading: false,
    Input: '',
    Location: 'center',
}

// TODO implement this
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

/**
 * * === useSearchBar hook ===
 *
 * @param state: the current state of the search bar.
 * @returns searchBar state and a handler for the utility functions
 */

const useSearch = (state: SearchBarT): SearchBarResponseT => {
    const [Response, setResponse] = useState<SearchBarT>(state)

    const { DefaultSize, DefaultAmount, SearchBarFormId } = Constants

    const onSubmit = async (
        e: SubmitEventT,
        Service: ServiceI,
    ): Promise<ResponseI | null> => {
        e.preventDefault()

        const Input = e.target[SearchBarFormId].value

        setResponse((prevState: SearchBarT) => ({
            ...prevState,
            isSearchLoading: true,
            Location: 'top',
            Input,
        }))

        const apiResponse = await Service.ImageRequest({
            n: DefaultAmount,
            size: DefaultSize,
            prompt: Input,
        })

        if (apiResponse) {
            // check backend error log...
            // TODO maybe some sort of alert custom hook call here?
            if (apiResponse.message.errorLog) {
                console.error(JSON.stringify(apiResponse.message.errorLog))
            }
            setResponse((prevState: SearchBarT) => ({
                ...prevState,
                searchLoading: false,
            }))
            return apiResponse
        }

        setResponse((prevState: SearchBarT) => ({
            ...prevState,
            searchLoading: false,
        }))

        return null
    }

    const onInputChange = useCallback((e: InputEventT) => {
        e.preventDefault()
        const Input = e.target.value
        // throttle setState with timeout
        const Timer = setTimeout(() => {
            setResponse((prevState) => ({
                ...prevState,
                Input: Input,
            }))
        }, 500)

        return clearTimeout(Timer)
    }, [])

    const onReset = (): void => {
        setResponse(InitialSearchState)
    }

    const Handler: SearchBarI = {
        onSubmit,
        onInputChange,
        onReset,
    }

    const SearchBarResponse: SearchBarResponseT = [Response, Handler]

    return SearchBarResponse
}

export default useSearch