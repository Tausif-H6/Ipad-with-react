
import './App.css';
import Navbar from './component/Navbar';

//React dom plugin
import React,{useState} from "react";
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
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>

              <Route exact path="/">
                <Home  showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Singup showAlert={showAlert} />
              </Route>



            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
