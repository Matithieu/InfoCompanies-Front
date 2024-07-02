import { Grid, useColorScheme } from '@mui/joy'
import React, { useEffect } from 'react'
import Footer from '../../components/pages/footer'
import Subscription from '../Subscription'
import HeaderLanding from './components/header'
import StepsList from './components/stepsList'
import './Landing.css'
import testImg from '/test.webp'
import video1 from '/videos/step-1.gif'
import video2 from '/videos/step-2.gif'

const Landing: React.FC = () => {
  const { mode } = useColorScheme()

  // Currently, when the color scheme is light, the background color is white so we change it to black
  if (mode === 'light') {
    document.body.style.backgroundColor = 'black'
  }

  const [playedVideo, setPlayedVideo] = React.useState(1)

  const handleVideoPlayed = (videoNumber: number) => {
    setPlayedVideo(videoNumber)
    console.log('Video played:', videoNumber)
  }

  const between = (min: number, max: number) =>
    Math.random() * (max - min) + min

  useEffect(() => {
    const bubblesContainer = document.getElementById('bubbles')
    const colors = ['#e44141', '#4f2af3']

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
    <div className="landing-root">
      <HeaderLanding />
      <div style={{ height: '100%' }}>
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
        <div className="landing-container">
          <div className="gradient-text basic">
            <span className="span-class big">Prospectez</span>
            <br />
            <span className="big">
              sans <span className="gradient-text fancy">efforts</span>
            </span>
          </div>
          <br />
          <div className="gradient-text basic">
            <span className="medium">
              Trouvez les{' '}
              <span className="gradient-text">entreprises adaptées</span>
            </span>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <a className="landing-link" target="_blank">
              <span
                onClick={() => {
                  console.log('Test')
                }}
              >
                Récupérer les téléphones
              </span>
            </a>
            <span style={{ fontSize: '1.3rem' }}>ou</span>
            <a className="landing-link" target="_blank">
              <span
                onClick={() => {
                  console.log('Test')
                }}
              >
                Récupérer les emails
              </span>
            </a>
          </div>
        </div>
        <div style={{ marginTop: '100px' }}></div>
        <div id="bubbles"></div>
        <div className="dashboard-border">
          <div className="dashboard">
            <img loading="lazy" src={testImg} style={{}} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="gradient-text basic" style={{ marginTop: '50px' }}>
            <span className="medium">Vous cherchez à contacter</span>
            <span className="medium">
              {' '}
              facilement{' '}
              <span
                className="gradient-text fancy medium"
                style={{ fontSize: '1.4rem' }}
              >
                des entreprises ?
              </span>
            </span>
          </div>
        </div>
        <div style={{ marginTop: '100px' }} />
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <StepsList onStepClick={handleVideoPlayed} />
          <div className="video-container">
            {playedVideo === 1 && (
              <img alt="Step 1" loading="lazy" src={video1} />
            )}
            {playedVideo === 2 && (
              <img alt="Step 2" loading="lazy" src={video2} />
            )}
          </div>
        </Grid>
        <div style={{ marginTop: '100px' }} />
        <div>
          <div
            className="gradient-text basic"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <span className="medium">Vous êtes au bon </span>
            <span
              className="gradient-text fancy medium"
              style={{ fontSize: '1.4rem', marginLeft: '0.4rem' }}
            >
              endroit
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Subscription />
          </div>
        </div>
      </div>
      <div style={{ bottom: 0, marginTop: '100px' }}>
        <Footer />
      </div>
    </div>
  )
}

export default Landing
