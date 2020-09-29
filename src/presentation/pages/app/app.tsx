import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages/';

import '../../styles/globals.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}/>
    </Switch>
    </BrowserRouter>
  )

}

export default App;