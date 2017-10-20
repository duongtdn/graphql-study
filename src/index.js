"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'


import { GC_AUTH_TOKEN } from './constants'
import Header from './Header'
import Login from './Login'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Search from './Search'



const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8xug9fk0aqt0128k0t51n78'
});

const wsClient = new SubscriptionClient(
  'wss://subscriptions.ap-northeast-1.graph.cool/v1/cj8xug9fk0aqt0128k0t51n78', 
  {
    reconnect: true,
    connectionParams: { authToken: localStorage.getItem(GC_AUTH_TOKEN),  }
  }
)

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
        <Switch>
          <Route exact path='/search' component={Search}/>          
          <Route exact path='/' component={LinkList}/>
          <Route exact path='/create' component={CreateLink}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/top' component={LinkList} />
          <Route exact path='/new/:page' component={LinkList} />          
        </Switch>
        </div>
      </div>
    )
  }

}

render(
  <BrowserRouter>
    <ApolloProvider client = {client} >
      <App />
    </ApolloProvider>  
  </BrowserRouter>
  , 
  document.getElementById('root')
);