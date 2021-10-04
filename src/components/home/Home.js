import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { Loan } from '../loan/Loan'
import { Support } from '../support/Support'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'

export const Home = () => {

    const cookies = new Cookies();
    let history = useHistory()
    const username=cookies.get('username')
    if(username==='' || username==null){
        history.push('/login')
    }

    return (
        <div class="homeinfo">
            <div>
                <h2>What Customer Can do?</h2>
                <ul class="list-group">

                    <li class="list-group-item list-group-item-dark">Can Apply Educational or Personal Loan</li>
                    <li class="list-group-item list-group-item-dark">Can Check Loan Status</li>
                    <li class="list-group-item list-group-item-dark">Can update profile details</li>
                </ul>
            </div>
        </div>
    )
}
