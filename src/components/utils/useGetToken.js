import { useState, useEffect } from 'react'
import { useAuth0 } from '../auth/react-auth0-wrapper'

function useGetToken() {
  const [token, setToken] = useState(null)

  const { getTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const result = await getTokenSilently()
        setToken(result)
      } catch (err) {
        console.log(err)
      }
    }
    fetchToken()
  })

  return [token]
}

export default useGetToken
