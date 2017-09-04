import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.message = 'Hello React';
  }

  render() {
    return (
      <div>
        <h1>{this.message}</h1>
      </div>
    );
  }
}

export default App;
