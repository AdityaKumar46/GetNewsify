

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



export default class App extends Component {
  pageSize = 5;
  apikey=process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
        />
          <Switch>
            <Route exact path="/"><News apikey={this.apikey} key="general" country="in" pageSize={this.pageSize} category="general" /></Route>
            <Route exact path="/business"><News apikey={this.apikey} key="business" country="in" pageSize={this.pageSize} category="business" /></Route>
            <Route exact path="/entertainment"><News apikey={this.apikey} key="entertainment" country="in" pageSize={this.pageSIze} category="entertainment" /></Route>
            <Route exact path="/general"><News apikey={this.apikey} key="general" country="in" pageSize={this.pageSize} category="general" /></Route>
            <Route exact path="/health"><News apikey={this.apikey} key="health" country="in" pageSize={this.pageSize} category="health" /></Route>
            <Route exact path="/science"><News apikey={this.apikey} key="science" country="in" pageSize={this.pageSize} category="science" /></Route>
            <Route exact path="/sports"><News apikey={this.apikey} key="sports" country="in" pageSize={this.pageSize} category="sports" /></Route>
            <Route exact path="/technology"><News apikey={this.apikey} key="technology" country="in" pageSize={this.pageSize} category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
