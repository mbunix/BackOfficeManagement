'use client'

import { store } from './store/store.js'
import { Provider } from 'react-redux'

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
