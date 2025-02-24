import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import LoadingSpinner from '~/components/Loading/LoadingSpinner'

function AccountVerification() {
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])

  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  if (!verified) return <LoadingSpinner caption='Verifying your account...' />

  return <Navigate to={`/login?verified=${email}`} />
}

export default AccountVerification