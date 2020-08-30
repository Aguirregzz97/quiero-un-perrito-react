import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import Navbar from './shared/Navbar'

type State = {
}

type Props = {
}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <>
      <Navbar />
        <Switch>
          <Route exact={ true } path='/' component={ Home } />
          <Route path='/registration' component={ Register } />
          <Route path='/login' component={ Login } />
        </Switch>
      </>
    )
  }
}
