import toast from 'react-hot-toast'
import { getServerTimeAPI } from '~/apis'
import { useEffect } from 'react'

/**
 * Warns the user if their device time is significantly out of sync with the server.
 * @param thresholdSeconds - The max allowed time drift in seconds (default: 30s).
 */
export const useTimeDriftWarning = (thresholdSeconds = 30) => {
  useEffect(() => {
    const checkTimeDrift = async () => {
      const res = await getServerTimeAPI()
      const serverTime = res.serverTime
      const clientTime = Date.now()
      const drift = Math.abs(serverTime - clientTime) / 1000

      if (drift > thresholdSeconds) {
        toast(`⚠️ Your system time is off by ~${Math.round(drift)} seconds. OTP verification might fail.`,
          { duration: 8000 })
      }
    }

    checkTimeDrift()
  }, [thresholdSeconds])
}
