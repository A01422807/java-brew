import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from './components/navigation'
import { Header } from './components/header'
import { Features } from './components/features'
import { About } from './components/about'
import { Services } from './components/services'
import { Gallery } from './components/gallery'
import { Team } from './components/Team'
import  SignInSide  from './components/signInSide'
  import  SignUp  from './components/signUp'
import JsonData from './data/data.json'

const App = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
       <Router>
          <div>
            <Switch>
              <Route exact path="/" component={SignInSide} />
              <Route exact path="/home"> <Navigation/> 
              <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery />
              <Team data={landingPageData.Team} />  </Route> 
              <Route exact path="/logIn" component={SignInSide} />
              <Route exact path="/signUp" component={SignUp} />
              <Route render={() => <h1>Not found!</h1>} />
            </Switch>
          </div>
        </Router>

{/*       */}
      
    </div>
  )
}

export default App