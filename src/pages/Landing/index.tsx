// https://github.com/sjoerdvanBommel/threeveloper/blob/025-simplistic-landing-pages-are-taking-over-the-internet/style.css

import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Landing.css"
import useAuthManager from "../../hooks/useAuthManager"

const Landing: React.FC = () => {
  const navigate = useNavigate()
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
          stroke="white"
          fill="transparent"
          viewBox="0 0 1600 480"
          className="svg-class"
        >
          <pattern
            id="small-grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <rect strokeWidth="0.2" width="100%" height="100%"></rect>
          </pattern>

          <pattern
            id="big-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%"></rect>
          </pattern>

          <rect width="100%" height="100%" fill="url(#big-grid)"></rect>

          <rect width="100%" height="100%" fill="url(#small-grid)"></rect>
        </svg>
      </div>
      <div className="container">
        <div className="gradient-text basic">
          <span className="span-class">Bienvenue</span>
          <br />
          <span className="big">
            sur <span className="gradient-text fancy">Info'Companies</span>
          </span>
        </div>
        <a target="_blank" className="landing-link">
          <span
            onClick={() => {
              console.log("redirectedLogin")
              authManager.redirectedLogin()
            }}
          >
            Login
          </span>
        </a>
        <a target="_blank" className="landing-link">
          <span onClick={() => navigate("/dashboard")}>Dashboard</span>
        </a>
        <a target="_blank" className="landing-link">
          <span onClick={() => authManager.silentLogout()}>SignOut</span>
        </a>
      </div>
      <div id="bubbles"></div>
    </div>
  )
}

export default Landing
