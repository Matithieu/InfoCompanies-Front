import ReusableContainer from '../../components/common/ReusableContainer'
import Footer from '../../components/pages/footer'
import PageStyleWrapper from '../../components/pages/PageStyleWrapper/pageStyleWrapper'
import Subscriptions from '../../components/parts/Subscription'
import HeaderLanding from '../Landing/components/header'

const SubscriptionPage: React.FC = () => {
  return (
    <PageStyleWrapper>
      <div>
        <HeaderLanding />
        <ReusableContainer style={{}}>
          <div className="landing-container">
            <Subscriptions />
          </div>
        </ReusableContainer>
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
    </PageStyleWrapper>
  )
}

export default SubscriptionPage
