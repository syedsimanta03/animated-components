import React from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import useKeypress from 'react-use-keypress'

let images = [
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
]

let collapsedAspectRatio = 3 / 2.4
let fullAspectRatio = 3 / 2
let gap = 2
let margin = 12

export default function Page() {
  let [index, setIndex] = useState(0)

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      setIndex(index + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      setIndex((i) => i - 1)
    }
  })

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className='h-full bg-black'>
        <div className='flex flex-col justify-center h-full mx-auto max-w-7xl'>
          <div className='relative overflow-hidden'>
            <motion.div animate={{ x: `-${index * 100}%` }} className='flex'>
              {images.map((image, i) => (
                <motion.img
                  key={image}
                  src={image}
                  animate={{ opacity: i === index? 1 : 0.3 }}
                  className='aspect-[3/2] object-cover'
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className='absolute flex items-center justify-center w-8 h-8 -mt-4 bg-white focus:outline-none focus-border-none left-2 top-1/2'
                  onClick={() => setIndex(index - 1)}
                >
                  <svg className='absolute w-6 h-6' viewBox='0 0 24 24'>
                    <path d='M11.8284 12.0005L14.6569 14.8289L13.2426 16.2431L9 12.0005L13.2426 7.75781L14.6569 9.17203L11.8284 12.0005Z'></path>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className='absolute flex items-center justify-center w-8 h-8 -mt-4 bg-white focus:outline-none focus:border-none right-2 top-1/2'
                  onClick={() => setIndex(index + 1)}
                >
                  <svg className='absolute w-6 h-6' viewBox='0 0 24 24'>
                    <path d='M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z'></path>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className='absolute inset-x-0 flex justify-center overflow-hidden bottom-6'>
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  index * gap +
                  margin
                }%`,
              }}
              style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
              className='flex h-14 w-[100px]'
            >
              {images.map((image, i) => (
                <motion.button
                  key={image}
                  onClick={() => setIndex(i)}
                  whileHover={{ opacity: 1 }}
                  initial={false}
                  animate={i === index ? 'active' : 'inactive'}
                  variants={{
                    active: {
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1,
                      aspectRatio: fullAspectRatio,
                    },
                    inactive: {
                      marginLeft: '0%',
                      marginRight: '0%',
                      opacity: 0.5,
                      aspectRatio: collapsedAspectRatio,
                    },
                  }}

                >
                  <motion.img
                    src={image}
                    className='object-cover w-full h-full'
                    key={image}
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
