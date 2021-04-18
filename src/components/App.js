//import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./Dashboard"


function App() {
  return (
    <Router>
       <Switch>
              <Route exact path = "/" component = {Dashboard} />
            
        </Switch>
    </Router>
  );
}

export default App;
