import { useState, useEffect } from 'react'
import { Router, Route, Switch } from "react-router-dom";
import { Navigation } from './components/navigation'
import { Header } from './components/header'
import { Features } from './components/features'
import { About } from './components/about'
import { Services } from './components/services'
import { Gallery } from './components/gallery'
import { Team } from './components/Team'
import  SignInSide  from './components/signInSide'
import  SignUp  from './components/signUp'
import FavCoffeeList from './components/favCoffeeList'
import JsonData from './data/data.json'
import history from './components/history';

import CoffeeList from './components/coffeeList';
import CoffeePreview from './components/coffeePreview'
const App = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
       <Router history={history}>
          <div>
            <Switch>
             <Route exact path="/"> <Navigation/> 
              <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery />
              <CoffeePreview></CoffeePreview>
              <Team data={landingPageData.Team} />  
              </Route> 
              <Route exact path="/home"> <Navigation/> 
              <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery />
              <CoffeePreview></CoffeePreview>
              <Team data={landingPageData.Team} />  
              </Route> 



              <Route exact path="/logIn" component={SignInSide} />
              <Route exact path="/signUp" component={SignUp} />
              <Route exact path="/coffeeList" >
                  <Navigation/> 
                  <CoffeeList></CoffeeList>
              </Route>
              <Route exact path="/favCoffee" >
                  <Navigation/> 
                  <FavCoffeeList></FavCoffeeList>
              </Route>
              <Route render={() => <h1>Not found!</h1>} />
              
            </Switch>
          </div>
        </Router>
    </div>
  )
}

export default App