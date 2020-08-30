import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Register from './Components/Register'

type State = {
}

type Props = {
}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <Switch>
        <Route exact={ true } path='/' component={ Home } />
        <Route exact={ true } path='/registration' component={ Register } />
      </Switch>
    )
  }
}
