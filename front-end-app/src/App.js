import './App.scss';
import {
  Switch,
  Route
} from "react-router-dom";

import { Navbar } from '../src/containers/navbar/navbar';
import { Footer } from '../src/containers/footer/footer';
import { Home } from '../src/containers/page/home/home';

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <div className='App__content'>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
  );
}

export default App;
