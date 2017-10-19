"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'

import LinkList from './LinkList'
import CreateLink from './CreateLink'


const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8xug9fk0aqt0128k0t51n78'
});

const client = new ApolloClient({
  networkInterface
});



class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ApolloProvider client = {client} >
        <CreateLink />
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById('root'));