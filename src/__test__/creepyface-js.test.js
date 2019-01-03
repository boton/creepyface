// @flow
/* global describe */

import doTest from './do-test'
import creepyface from '../index'

describe('Using JS api', () => {
  doTest(img => {
    img.setAttribute('src', 'srcUrl')

    return creepyface(img, {
      throttle: 100,
      hover: 'hoverUrl',
      looks: [
        { angle: 0 * 45, src: 'northUrl' },
        { angle: 1 * 45, src: 'northEastUrl' },
        { angle: 2 * 45, src: 'eastUrl' },
        { angle: 3 * 45, src: 'southEastUrl' },
        { angle: 4 * 45, src: 'southUrl' },
        { angle: 5 * 45, src: 'southWestUrl' },
        { angle: 6 * 45, src: 'westUrl' },
        { angle: 7 * 45, src: 'northWestUrl' }
      ]
    })
  })
})