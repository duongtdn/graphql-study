"use strict"

import React, { Component } from 'react'

class Link extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    );
  }



}

export default Link