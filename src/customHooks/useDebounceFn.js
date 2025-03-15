/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { debounce } from 'lodash'
/**
 * Custom hook for debouncing a function, takes two parameters: the function and the delay time.
 * Reference articles:
 * https://trippingoncode.com/react-debounce-hook/
 * https://lodash.com/docs/4.17.15#debounce
 */
export const useDebounceFn = (fnToDebounce, delay = 500) => {
  // Throw an error immediately if the provided delay is not a number
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.')
  }
  // Similarly, throw an error if fnToDebounce is not a function
  if (!fnToDebounce || (typeof fnToDebounce !== 'function')) {
    throw new Error('Debounce must have a function')
  }

  // Wrap the debounce execution from lodash inside useCallback to prevent unnecessary re-renders,
  // ensuring it only re-renders when fnToDebounce or delay changes (as explained in the referenced articles)
  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay])
}