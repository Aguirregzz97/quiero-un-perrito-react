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
      <div>
        <main>
            <Switch>
              <Route exact={ true } path='/' component={ Home } />
              <Route path='/registration' component={ Register } />
            </Switch>
        </main>
      </div>
    )
  }
}
