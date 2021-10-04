import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { Home } from '../home/Home';
import { Support } from '../support/Support';
import { Loan } from '../loan/Loan'
import { useHistory } from 'react-router-dom'
import './Landing.css';
import { Register } from '../login/Register';
import Cookies from 'universal-cookie';

export const Landing = () => {

    const cookies = new Cookies();
    let history = useHistory()
    const username=cookies.get('username')
    const name=cookies.get('name')
    if(username==='' || username==null){
        history.push('/login')
    }

    const logout = () => {
        cookies.remove('username')
        cookies.remove('name')
        history.push('/login')
    }

    return (
        <div>
            <Router>
                <nav class="navbar navbar-dark bg-dark">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link"><strong className="linktext">Welcome {name}</strong></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/home" className="linktext">Home</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/loan" className="linktext">Loan</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/profile" className="linktext">Update Profile</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"><Link to="/support" className="linktext">Support</Link></a>
                        </li>
                        <form className="form-inline">
                            <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={logout}>LogOut</button>
                        </form>
                    </ul >
                </nav >
                <Route path="/home" component={Home} />
                <Route path="/loan" component={Loan} />
                <Route path="/profile" component={()=><Register value="update"/>} />
                <Route path="/support" component={Support} />
            </Router>

        </div>
    )
}
