import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Service from '../services/Service'
import ImageContainer from './ImageContainer'

interface Props {
  wallpaper: string
  setWallpaper: Dispatch<SetStateAction<string>>
  setInitializing: Dispatch<SetStateAction<boolean>>
}

const defaultPrompt = 'epic space wallpaper'
const wallpaperSize = '1920x1080'

const LandingContainer = (props: Props): JSX.Element => {
  const { wallpaper, setWallpaper, setInitializing } = props

  useEffect(() => {
    if (wallpaper === '') {
      const getNewWallpaper = (): void => {
        setInitializing(true)

        // get wallpaper through service
        Service.Post({
          request: { prompt: defaultPrompt, n: 1, size: wallpaperSize },
        })
          .then((res: ResponseI | undefined) => {
            if (res?.result) {
              // TODO if null need to throw 404 or something
              if (res.result.data.length !== 0) {
                // is this sketchy?
                const url = res.result.data[0].url
                if (url) {
                  setWallpaper(url)
                }
              }
            }
            return
          })
          .finally(() => setInitializing(false))
      }

      return getNewWallpaper()
    }
  }, [wallpaper, setInitializing, setWallpaper])

  return (
    <div className='landing-container'>
      {wallpaper ? <ImageContainer key={wallpaper} src={wallpaper} /> : '???'}
    </div>
  )
}

export default LandingContainer
