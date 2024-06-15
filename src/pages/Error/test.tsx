export default function Test() {
  async function testFunction() {
    console.log('test')

    try {
      const response = await fetch('/api/v1/company-seen/update-company-ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([1]), // Ensure these are numbers to match Long in Java
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Example: http://localhost:8080/api/v1/company/random-unseen?page=0
  async function fetchRandomUnseenCompany() {
    try {
      const response = await fetch('/api/v1/company/random-unseen?page=0')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1>Test</h1>
      <button
        onClick={async () => {
          await testFunction()
        }}
      >
        Fetch company
      </button>
      <button
        onClick={async () => {
          await fetchRandomUnseenCompany()
        }}
      >
        Fetch random unseen company
      </button>
    </div>
  )
}
