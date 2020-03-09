import React, { useState, useCallback } from 'react'
import Creepyface from 'react-creepyface'
import Loader from './Loader'
import { FaceIcon } from './Icon'
import baseURL from '../url'
import { ValidAngle } from '../redux/types'
import { getAngles } from '../get-next'
import { useSelector } from './State'

const noop = () => {}
const url = (id: number, size?: string) => (name: string) =>
  `${baseURL}/img/${id}/${name}${size ? '/' + size : ''}`

export type Images = {
  src: string
  hover: string
  looks: { angle: ValidAngle; src: string }[]
}

export const getHostedImages = (id = 0, size?: 'small'): Images => {
  const getUrl = url(id, size)
  return {
    src: getUrl('serious'),
    hover: getUrl('hover'),
    looks: getAngles().map(angle => ({ angle, src: getUrl(`${angle}`) }))
  }
}

export default function CreepyFace(props: {
  alt?: string
  images: Images
  hidden?: boolean
  onSelect?: () => void
  onChange?: (src: string) => void
  onLoad?: () => void
}) {
  const {
    alt,
    images,
    hidden,
    onSelect = noop,
    onChange = noop,
    onLoad = noop
  } = props
  const [firstAttach, setFirstAttach] = useState(true)
  const [attached, setAttached] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const showFirefly = useSelector(state => state.showFirefly)
  const onAttach = useCallback(() => {
    setAttached(true)
    setFirstAttach(false)
    onLoad()
  }, [onLoad])
  const onDetach = useCallback(() => {
    setAttached(false)
  }, [])
  const onDebug = useCallback(({ src }) => onChange(src), [onChange])
  return (
    <span className="creepy">
      {!hidden && (
        <Creepyface
          alt={alt}
          src={images.src}
          options={{
            hover: images.hover,
            looks: images.looks,
            points: showFirefly ? 'firefly' : undefined,
            onAttach,
            onDetach,
            onDebug
          }}
          onClick={onSelect}
          onLoad={() => setLoaded(true)}
        />
      )}
      {(!loaded || firstAttach || hidden) && (
        <div className="placeholder">
          <FaceIcon />
        </div>
      )}
      {!hidden && (!attached || !loaded) && <Loader />}
    </span>
  )
}