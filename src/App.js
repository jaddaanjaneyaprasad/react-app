import logo from './logo.svg';
import './App.css';
import { Register } from './components/login/Register'
import { Login } from './components/login/Login'
import { Loan } from './components/loan/Loan'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { Home } from './components/home/Home';
import { Support } from './components/support/Support';
import { Landing } from './components/landing/Landing';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/profile" component={Register}></Route>
          <Route exact path="/landing" component={Landing}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/loan" component={Loan}></Route>
          <Route exact path="/support" component={Support}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
