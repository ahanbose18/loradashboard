//import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./Dashboard"
import Send from "./Send"
import Login from "./Login"
import Signup from "./Signup"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "../contexts/AuthContexts";
import HomePage from "./HomePage";
import EmailJs from "./EmailJs";
import Maps from "./Map.js"

function App() {
  return (
    <Router>
       <Switch>
          <AuthProvider>
              <Route exact path = "/" component = {HomePage} />
              <Route exact path = "/login" component = {Login} />
              <Route exact path = "/signup" component = {Signup} />
              <Route exact path = "/send" component = {Send} />
              <Route exact path = "/email" component = {EmailJs} />
              <Route exact path = "/tracking" component = {Maps} />
              <PrivateRoute exact path = "/dashboard" component = {Dashboard} />            
          </AuthProvider>
              
        </Switch>
    </Router>
  );
}

export default App;
