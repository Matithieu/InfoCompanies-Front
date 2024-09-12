import Footer from '../../components/pages/footer'
import Subscriptions from '../../components/parts/Subscription'
import HeaderLanding from '../Landing/components/LandingHeader'

const SubscriptionPage: React.FC = () => {
  return (
    <div>
      <HeaderLanding />
      <div className="landing-container">
        <Subscriptions />
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Footer />
      </div>
    </div>
  )
}

export default SubscriptionPage
