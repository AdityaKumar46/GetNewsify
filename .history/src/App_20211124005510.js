

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";



const App = () => {
  const pageSize = 6;
  const apikey=process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <HashRouter>
          <Navbar />
          <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
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
        </HashRouter>
      </div>
    )
}

export default App;