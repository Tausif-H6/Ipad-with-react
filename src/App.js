
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

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert message="Hi I am alert"/>
    <div className="container">
    <Switch>
     <Route exact path="/">
     <Home/>
     </Route>
     <Route exact path="/about">
     <About/>
     </Route>
    </Switch>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
