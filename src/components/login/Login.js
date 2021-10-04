import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import './Login.css';
import Cookies from 'universal-cookie';
// import { Register } from './Register';

export const Login = () => {

    const cookies = new Cookies();

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const initValues={
        username: '',
        password: ''
    }
    
    const [errors,setErrors]=useState(initValues)

    let history = useHistory()

    const handleInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        validateform()
        cookies.set('name','prasad', { path: '/' });
        cookies.set('username',user.username, { path: '/' });
        history.push('/landing')
        //setUser({})
    }

    const redirectRegister = () => {
        history.push('/profile')
    }

    const validateform=()=>{
        setErrors(initValues)
        if(user.username==='' || user.username==null){
            //setErrors({...errors,usererror:'username is required'})
            setErrors(errors=>
                ({...errors,username:'username is required'})
            )
        }else{
            setErrors(errors=>
                ({...errors,username:''})
            )
            //setErrors({...errors})
        }

        if(user.password==='' || user.password==null){
            //setErrors({...errors,passerror:'password is required'})
            setErrors(errors=>
                ({...errors,password:'password is required'})
            )
        }else{
            setErrors(errors=>
                ({...errors,password:''})
            )
            //setErrors({...errors})
        }
        
    }

    return (
        <div className="main-div">
            <div className="col-lg-3 col-lg-offset-3">
                <h2 className="title">Login Here</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control form-control-sm"
                        value={user.username} name="username" placeholder="Enter username*" onChange={handleInput} />
                    {errors.username && <div><p className="error-text">{errors.username}</p></div>}
                    <input type="password" className="form-control form-control-sm"
                        value={user.password} name="password" placeholder="Enter Password*" onChange={handleInput} />
                    {errors.password && <div><p className="error-text">{errors.password}</p></div>}
                    <button type="submit" className="btn btn-sm btn-outline-dark">Login</button>
                    <button type="button" className="btn btn-sm btn-outline-dark" onClick={redirectRegister}>Register</button>

                </form>
            </div>
        </div>
    )
}
