import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import configure from './store/configure'

const store = configure()

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

export default Root