'use client'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'

// Provide the store to the app
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
