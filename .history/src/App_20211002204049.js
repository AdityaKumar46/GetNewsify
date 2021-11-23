import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



const App = () => {
  const [pro, setPro] = useState(0);
  const pageSize = 5;
  const apikey=process.env.REACT_APP_NEWS_API
  const state = {
    progress:0
  }
  const setProgress = (progress) => {
    setPro(progress);
  }
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          color='#f11946'
          height={3}
          progress={state.progress}
        />
          <Switch>
            <Route exact path="/"><News setProgress={setProgress} apikey={apikey} key="general" country="in" pageSize={pageSize} category="general" /></Route>
            <Route exact path="/business"><News setProgress={setProgress} apikey={apikey} key="business" country="in" pageSize={pageSize} category="business" /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress} apikey={apikey} key="entertainment" country="in" pageSize={pageSize} category="entertainment" /></Route>
            <Route exact path="/general"><News setProgress={setProgress} apikey={apikey} key="general" country="in" pageSize={pageSize} category="general" /></Route>
            <Route exact path="/health"><News setProgress={setProgress} apikey={apikey} key="health" country="in" pageSize={pageSize} category="health" /></Route>
            <Route exact path="/science"><News setProgress={setProgress} apikey={apikey} key="science" country="in" pageSize={pageSize} category="science" /></Route>
            <Route exact path="/sports"><News setProgress={setProgress} apikey={apikey} key="sports" country="in" pageSize={pageSize} category="sports" /></Route>
            <Route exact path="/technology"><News setProgress={setProgress} apikey={apikey} key="technology" country="in" pageSize={pageSize} category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
}

export default App;