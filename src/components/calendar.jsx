import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'

export default function Calendar() {
  let [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'))
  let month = parse(monthString, 'yyyy-MM', new Date())
  let [direction, setDirection] = useState()
  let [isAnimating, setIsAnimating] = useState(false);

  function nextMonth() {
    if (isAnimating) return

    let next = addMonths(month, 1)

    setMonthString(format(next, 'yyyy-MM'))
    setDirection(1)
    setIsAnimating(true)
  }

  function previousMonth() {
    if (isAnimating) return

    let previous = subMonths(month, 1)

    setMonthString(format(previous, 'yyyy-MM'))
    setDirection(-1)
    setIsAnimating(true)
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  })

  // let transition = { type: "tween", ease: "easeOut", duration: 0.25 };
  let transition = { type: 'spring', bounce: 0, duration: 0.3 }
  let variants = {
    enter: (direction) => {
      // console.log({ direction });
      return { x: `${100 * direction}%`, opacity: 0 }
      // return { x: "100%" };
    },
    middle: { x: '0%', opacity: 1 },
    // exit: { x: "-100%" },
    exit: (direction) => {
      // return { x: "-100%" };
      return { x: `${-100 * direction}%`, opacity: 0 }
    },
    // exit: (direction) => {
    //   console.log({ direction });
    //   return { x: `${-100 * direction}%` };
    // },
  }

  let removeImmediately = {
    exit: { visibility: 'hidden' },
  }

  return (
    <MotionConfig transition={transition}>
      <div className='flex items-start min-h-screen pt-16 bg-stone-800 text-stone-900'>
        <div className='relative w-full max-w-md mx-auto overflow-hidden bg-white rounded-2xl'>
          <div className='py-8'>
            <div className='flex flex-col justify-center text-center rounded'>
              <ResizablePanel>
                {/*  onExitComplete is a guard here to check if animation running or not */}
                <AnimatePresence
                  mode='popLayout'
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  {/* without key new month won't rerender onClick, no rerender means no animation for it , without AnimatePresence exit property won't work */}
                  <motion.div
                    key={monthString}
                    initial='enter'
                    animate='middle'
                    exit='exit'
                  >
                    <header className='relative flex justify-between px-8'>
                      <button
                        className='z-10 rounded-full p-1.5 bg-white hover:bg-stone-100'
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className='w-4 h-4' />
                      </button>
                      {/* AnimatePresence & initial, animate, exit copied by children/s just by using variants */}
                      <motion.p
                        variants={variants}
                        custom={direction}
                        className='absolute inset-0 flex items-center justify-center font-semibold'
                      >
                        {format(month, 'MMMM yyyy')}
                      </motion.p>
                      <button
                        className='z-10 rounded-full p-1.5 bg-white hover:bg-stone-100'
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className='w-4 h-4' />
                      </button>
                      <motion.div
                        className='absolute inset-0'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)',
                        }}
                        variants={removeImmediately}
                      />
                    </header>
                    <motion.div
                      /* to avoid overlap during exit */
                      variants={removeImmediately}
                      className='grid grid-cols-7 px-8 mt-6 text-sm gap-y-6'
                    >
                      <span className='font-medium text-stone-500'>Su</span>
                      <span className='font-medium text-stone-500'>Mo</span>
                      <span className='font-medium text-stone-500'>Tu</span>
                      <span className='font-medium text-stone-500'>We</span>
                      <span className='font-medium text-stone-500'>Th</span>
                      <span className='font-medium text-stone-500'>Fr</span>
                      <span className='font-medium text-stone-500'>Sa</span>
                    </motion.div>
                    <motion.div
                      variants={variants}
                      custom={direction}
                      className='grid grid-cols-7 px-8 mt-6 text-sm gap-y-6'
                    >
                      {days.map((day) => (
                        <span
                          className={`${
                            isSameMonth(day, month) ? '' : 'text-stone-300'
                          } font-semibold`}
                          key={format(day, 'yyyy-MM-dd')}
                        >
                          {format(day, 'd')}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

function ResizablePanel({ children }) {
  let [ref, bounds] = useMeasure()

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : null }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}