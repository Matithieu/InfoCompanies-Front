// https://github.com/sjoerdvanBommel/threeveloper/blob/025-simplistic-landing-pages-are-taking-over-the-internet/style.css

import "./Landing.css"

import React, { useEffect } from "react"

import useAuthManager from "../../hooks/useAuthManager"
import { fetchUser } from "../../utils/api"
import { useAppNavigate } from "../../utils/navigation/navigation"
import { fetchUserEmail } from "../../utils/proxy"

const Landing: React.FC = () => {
  const { navigation } = useAppNavigate();
  const authManager = useAuthManager()
  const between = (min: number, max: number) =>
    Math.random() * (max - min) + min

  useEffect(() => {
    const bubblesContainer = document.getElementById("bubbles")
    const colors = ["#e44141", "#4f2af3"]

    const createBubble = () => {
      const bubble = document.createElement("div")
      bubble.classList.add("bubble")

      if (bubblesContainer) {
        bubblesContainer.appendChild(bubble)

        bubble.style.left = `${between(0, 100)}%`

        const sizePx = `${between(4, 8)}px`

        const floatingBubbleKeyFrames = [{ top: "100%" }, { top: `-${sizePx}` }]

        const floatingAnimation = bubble.animate(
          floatingBubbleKeyFrames,
          between(10000, 40000)
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
    <div style={{ height: "100%" }}>
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
      </div>
      <div className="container">
        <div className="gradient-text basic">
          <span className="span-class">Bienvenue</span>
          <br />
          <span className="big">
            sur <span className="gradient-text fancy">Info&apos;Companies</span>
          </span>
        </div>
        <a className="landing-link" target="_blank">
          <span
            onClick={() => {
              authManager.signIn()
            }}
          >
            Login
          </span>
        </a>
        <a className="landing-link" target="_blank">
          <span onClick={() => navigation.toDashboard()}>Dashboard</span>
        </a>
        <a className="landing-link" target="_blank">
          <span onClick={() => authManager.signOut()}>SignOut</span>
        </a>
        <a className="landing-link" target="_blank">
          <span onClick={async () => await fetchUser()}>TEST</span>
        </a>
        <a className="landing-link" target="_blank">
          <span onClick={async () => await fetchUserEmail()}>USER</span>
        </a>
      </div>
      <div id="bubbles"></div>
    </div>
  )
}

export default Landing
