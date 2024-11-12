import SubscriptionList from '../../components/parts/SubscriptionList/SubscriptionList'

const SubscriptionPage: React.FC = () => {
  return (
    <div>
      <div>
        <SubscriptionList />
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      ></div>
    </div>
  )
}

export default SubscriptionPage
