import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ManageBlogPage } from 'pages'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ManageBlogPage} />
      </Switch>
    </div>
  )
}

export default App