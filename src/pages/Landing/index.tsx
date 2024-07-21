import './Landing.css'

import { Grid, useColorScheme } from '@mui/joy'
import React, { useEffect } from 'react'

import ReusableContainer from '../../components/common/ReusableContainer'
import Footer from '../../components/pages/footer'
import PageStyleWrapper from '../../components/pages/PageStyleWrapper/pageStyleWrapper'
import Subscriptions from '../../components/parts/Subscription'
import HeaderLanding from './components/header'
import StepsList from './components/stepsList'

import testImg from '/test.webp'
import video1 from '/videos/step-1.gif'
import video2 from '/videos/step-2.gif'

const Landing: React.FC = () => {
  const { mode } = useColorScheme()

  useEffect(() => {
    if (mode === 'light') {
      document.body.style.backgroundColor = 'black'
    }
  }, [mode])

  const [playedVideo, setPlayedVideo] = React.useState(1)

  const handleVideoPlayed = (videoNumber: number) => {
    setPlayedVideo(videoNumber)
  }

  return (
    <PageStyleWrapper>
      <div className="landing-root">
        <HeaderLanding />
        <ReusableContainer style={{ height: '100%' }}>
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
              <Subscriptions />
            </div>
          </div>
        </ReusableContainer>
        <div style={{ bottom: 0, marginTop: '100px' }}>
          <Footer />
        </div>
      </div>
    </PageStyleWrapper>
  )
}

export default Landing
