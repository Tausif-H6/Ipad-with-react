
import './App.css';
import Navbar from './component/Navbar';

//React dom plugin
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import NoteState from './Context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Singup from './component/Singup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Hi I am alert" />
          <div className="container">
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Singup />
              </Route>



            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
