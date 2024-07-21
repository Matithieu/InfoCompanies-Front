// PageStyleWrapper.tsx
import './pageStyleWrapper.css'

import React, { useEffect } from 'react'

interface PageStyleWrapperProps {
  children: React.ReactNode
}

const PageStyleWrapper: React.FC<PageStyleWrapperProps> = ({ children }) => {
  useEffect(() => {
    const bubblesContainer = document.getElementById('bubbles')
    const colors = ['#e44141', '#4f2af3']

    const between = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const createBubble = () => {
      const bubble = document.createElement('div')
      bubble.classList.add('bubble')

      if (bubblesContainer) {
        bubblesContainer.appendChild(bubble)
        bubble.style.left = `${between(0, 100)}%`
        const sizePx = `${between(4, 8)}px`
        const floatingBubbleKeyFrames = [{ top: '100%' }, { top: `-${sizePx}` }]
        const floatingAnimation = bubble.animate(
          floatingBubbleKeyFrames,
          between(10000, 40000),
        )

        floatingAnimation.onfinish = () => {
          if (bubblesContainer.contains(bubble)) {
            bubblesContainer.removeChild(bubble)
          }
        }

        bubble.style.width = sizePx
        bubble.style.height = sizePx
        const randomColorIndex = Math.floor(Math.random() * colors.length)
        bubble.style.background = colors[randomColorIndex]
        bubble.style.opacity = `${between(20, 100)}%`
      }
    }

    const intervalId = setInterval(createBubble, 100)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <div className="glow"></div>
      <svg
        className="svg-class"
        fill="transparent"
        stroke="white"
        viewBox="0 0 1600 480"
      >
        <pattern
          height="10"
          id="small-grid"
          patternUnits="userSpaceOnUse"
          width="10"
        >
          <rect height="100%" strokeWidth="0.2" width="100%"></rect>
        </pattern>
        <pattern
          height="80"
          id="big-grid"
          patternUnits="userSpaceOnUse"
          width="80"
        >
          <rect height="100%" width="100%"></rect>
        </pattern>
        <rect fill="url(#big-grid)" height="100%" width="100%"></rect>
        <rect fill="url(#small-grid)" height="100%" width="100%"></rect>
      </svg>
      <div id="bubbles"></div>
      {children}
    </div>
  )
}

export default PageStyleWrapper
