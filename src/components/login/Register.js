import React, { useState,useEffect } from 'react'
import './Register.css';
import { Redirect, Route } from "react-router";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';

export const Register = ({value=''}) => {

    console.log(value);

    const guardiantypes = ['father', 'mother', 'uncle', 'relative', 'friend']
    const genders = ['male', 'female', 'other']
    const accounttypes = ['savings', 'salary', 'other']
    const maritalstatuses = ['married', 'unmarried', 'divorced', 'widowed', 'other']
    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

    const initValues = {
        name: '',
        customerid: '',
        username: '',
        password: '',
        guardiantype: '',
        guardianname: '',
        address: '',
        citizenship: '',
        state: '',
        country: '',
        emailaddress: '',
        gender: '',
        maritalstatus: '',
        contactno: '',
        dob: '',
        regdate: '',
        accounttype: '',
        branchname: '',
        citizenstatus: '',
        initialdepamount: '',
        idprooftype: '',
        iddocnumber: '',
        refaccholdername: '',
        refaccholderaccnumber: '',
        refaccholderaddress: ''
    }

    const [user, setUser] = useState(initValues)

    const [error, setError] = useState(initValues)

    let history = useHistory()

    const handleInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        // axios.get(`https://jsonplaceholder.typicode.com/posts/`)
        // .then(res=>{
        //     console.log(res);
        //     setUser(res.data)
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        //setUser()

        if(value==='update'){
            setUser({
                "name": "prasad",
                "username": "prasad51",
                "password": "ahfgajfa",
                "guardiantype": "father",
                "guardianname": "ramana",
                "citizenship": "indian",
                "state": "Arunachal Pradesh",
                "country": "india",
                "emailaddress": "prasad@gmail.cm",
                "gender": "male",
                "maritalstatus": "unmarried",
                "contactno": "8019401855",
                "dob": "1995-05-24",
                "address": "1-43, inavolu",
                "refaccholderaddress": "1-43, inavolu",
                "accounttype": "savings",
                "branchname": "guntur",
                "initialdepamount": "10000",
                "idprooftype": "aadhar",
                "iddocnumber": "123456783456",
                "refaccholdername": "prasad",
                "refaccholderaccnumber": "BEl1234455",
                "customerid": "R-462",
                "regdate": "2021-10-1"
        })
        }else{
            
        }
    },[user])

    const validate = () => {
        setError(initValues)

        validatePattern(user.name, 'name', /^[a-zA-Z ]+$/)
        validatePattern(user.username, 'username', /^[0-9a-zA-Z]*$/)
        validatePattern(user.guardianname, 'guardianname', /^[a-zA-Z]+$/)
        validatePattern(user.citizenship, 'citizenship', /^[a-zA-Z]+$/)
        validatePattern(user.country, 'country', /^[a-zA-Z]+$/)
        validatePattern(user.contactno, 'contactno', /^\d+$/)
        validatePattern(user.branchname, 'branchname', /^[a-zA-Z ]+$/)
        validatePattern(user.citizenstatus, 'citizenstatus', /^[a-zA-Z ]+$/)
        validatePattern(user.initialdepamount, 'initialdepamount', /^\d+$/, user.accounttype)
        validatePattern(user.idprooftype, 'idprooftype', /^[a-zA-Z ]+$/)
        validatePattern(user.iddocnumber, 'iddocnumber', /^[0-9a-zA-Z]*$/)
        validatePattern(user.refaccholdername, 'refaccholdername', /^[a-zA-Z ]+$/)
        validatePattern(user.refaccholderaccnumber, 'refaccholderaccnumber', /^[0-9a-zA-Z]*$/)
        validatePattern(user.emailaddress, 'emailaddress', /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)


        validateInput(user.password, 'password')
        validateInput(user.address, 'address')
        validateInput(user.refaccholderaddress, 'refaccholderaddress')

        validateDropdown(user.guardiantype, 'guardiantype')
        validateDropdown(user.state, 'state')
        validateDropdown(user.gender, 'gender')
        validateDropdown(user.maritalstatus, 'maritalstatus')
        validateDropdown(user.accounttype, 'accounttype')

        console.log(error);
    }

    const validateInput = (val, inputType) => {

        if (val === '' || val == null) {
            setError((error) =>
                ({ ...error, [inputType]: `${inputType} is required` })
            )
        } else {
            setError((error) =>
                ({ ...error, [inputType]: '' })
            )
        }
    }

    const validateDropdown = (val, inputType) => {
        if (val === 'default' || val == null || val === '') {
            setError((error) =>
                ({ ...error, [inputType]: `Choose ${inputType}` })
            )
        } else {
            setError((error) =>
                ({ ...error, [inputType]: '' })
            )
        }
    }

    const validateAge=(val)=>{
        let dobyear=new Date(val).getFullYear()
        let curyear = new Date().getFullYear()
        let age=curyear-dobyear
        let citstatus='';

        if(age<18 || age>96){
            setError((error) =>
                ({ ...error, dob: `dob is invalid` })
            )
        }

        if(age>18 && age<60){
            citstatus='normal'
        }else if(age<18){
            citstatus='minor'
        }else if(age>60){
            citstatus='senior'
        }else{
            citstatus=''
        }

        console.log(age);
        console.log(citstatus);

        setUser({ ...user, citizenstatus: citstatus })
    }

    const validatePattern = (val, inputType, pattern, accType = "salary") => {

        if (val === '' || val == null) {
            setError((error) =>
                ({ ...error, [inputType]: `${inputType} is required` })
            )
        } else if (!pattern.test(val)) {
            setError((error) =>
                ({ ...error, [inputType]: `${inputType} is invalid` })
            )
        } else {
            setError((error) =>
                ({ ...error, [inputType]: `` })
            )
        }

        if (inputType === 'initialdepamount') {
            if (accType === 'savings' && val < 5000) {
                setError((error) =>
                    ({ ...error, [inputType]: `${inputType} is insufficient` })
                )
            } else {
                setError((error) =>
                    ({ ...error, [inputType]: `` })
                )
            }
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        const custid = getCustomerId()
        validate()
        validateAge(user.dob)
        setUser({ ...user, customerid: custid,regdate:getDate() })
        history.push('/login')
    }

    const getCustomerId = () => {
        const min = 100;
        const max = 999;
        const rand = min + Math.random() * (max - min);
        return "R-" + rand.toFixed()
    }

    const getDate = (separator = '-') => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="child-div">
                        <h3>User Login Details</h3>
                        <div className="inner-div">
                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.name} name="name" placeholder="Enter name*"
                                    onChange={handleInput}
                                />
                                {error.name && <div><p className="error-text">{error.name}</p></div>}
                            </div>
                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.username} name="username" placeholder="Enter username*"
                                    onChange={handleInput}
                                />
                                {error.username && <div><p className="error-text">{error.username}</p></div>}
                            </div>
                            <div className="flex-item">
                                <input type="password" className="form-control flex-item" value={user.password} name="password" placeholder="Enter password*"
                                    onChange={handleInput}
                                />
                                {error.password && <div><p className="error-text">{error.password}</p></div>}
                            </div>
                            <div className="flex-item select-div">
                                <select value={user.guardiantype} className="form-select" name="guardiantype" onChange={handleInput}>
                                    <option value="default">Choose Guardian Type</option>
                                    {guardiantypes.map(guardian => <option value={guardian}>{guardian}</option>)}
                                </select>
                                {error.guardiantype && <div><p className="error-text">{error.guardiantype}</p></div>}
                            </div>
                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.guardianname} name="guardianname" placeholder="Enter guardianname*"
                                    onChange={handleInput}
                                />
                                {error.guardianname && <div><p className="error-text">{error.guardianname}</p></div>}
                            </div>
                        </div>
                    </div>
                    <div className="child-div">
                        <h3>User Personal Details</h3>
                        <div className="inner-div">
                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.citizenship} name="citizenship" placeholder="Enter citizenship*"
                                    onChange={handleInput}
                                />
                                {error.citizenship && <div><p className="error-text">{error.citizenship}</p></div>}
                            </div>

                            <div className="flex-item select-div">
                                <select value={user.state} className="form-select" name="state" onChange={handleInput}>
                                    <option value="default">Choose State</option>
                                    {states.map(state => <option value={state}>{state}</option>)}
                                </select>
                                {error.state && <div><p className="error-text">{error.state}</p></div>}
                            </div>
                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.country} name="country" placeholder="Enter country*"
                                    onChange={handleInput}
                                />
                                {error.country && <div><p className="error-text">{error.country}</p></div>}
                            </div>

                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.emailaddress} name="emailaddress" placeholder="Enter emailaddress*"
                                    onChange={handleInput}
                                />
                                {error.emailaddress && <div><p className="error-text">{error.emailaddress}</p></div>}
                            </div>
                            <div className="flex-item select-div">
                                <select value={user.gender} className="form-select" name="gender" onChange={handleInput}>
                                    <option value="default">Choose Gender</option>
                                    {genders.map(gender => <option value={gender}>{gender}</option>)}
                                </select>
                                {error.gender && <div><p className="error-text">{error.gender}</p></div>}
                            </div>
                            <div className="flex-item select-div">
                                <select value={user.maritalstatus} className="form-select" name="maritalstatus" onChange={handleInput}>
                                    <option value="default">Choose Marital Status</option>
                                    {maritalstatuses.map(mstatus => <option value={mstatus}>{mstatus}</option>)}
                                </select>
                                {error.maritalstatus && <div><p className="error-text">{error.maritalstatus}</p></div>}
                            </div>
                            <div className="flex-item">
                                <input type="number" className="form-control" value={user.contactno} name="contactno" placeholder="Enter contactno*"
                                    onChange={handleInput}
                                />
                                {error.contactno && <div><p className="error-text">{error.contactno}</p></div>}
                            </div>

                            <div className="textarea-div">
                                <div className="dob-div">
                                    <label className="dob-label">Dob:</label>
                                    <input type="date" className="form-control" value={user.dob} name="dob"
                                        onChange={handleInput}
                                    />
                                </div>

                                {error.dob && <div><p className="error-text">{error.dob}</p></div>}
                            </div>

                        </div>
                        <div className="textarea-div">
                            <textarea rows="3" type="text" className="form-control flex-item" value={user.address} name="address" placeholder="Enter address*"
                                onChange={handleInput}
                            />
                            {error.address && <div><p className="error-text">{error.address}</p></div>}
                        </div>

                    </div>
                    <div className="child-div">
                        <h3>User Account Details</h3>
                        <div className="inner-div">
                            <div className="flex-item select-div">
                                <select value={user.accounttype} className="form-select" name="accounttype" onChange={handleInput}>
                                    <option value="default">Choose Accounttype</option>
                                    {accounttypes.map(acctype => <option value={acctype}>{acctype}</option>)}
                                </select>
                                {error.accounttype && <div><p className="error-text">{error.accounttype}</p></div>}
                            </div>
                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.branchname} name="branchname" placeholder="Enter branchname*"
                                    onChange={handleInput}
                                />
                                {error.branchname && <div><p className="error-text">{error.branchname}</p></div>}
                            </div>

                            <div className="flex-item">
                                <input type="number" className="form-control" value={user.initialdepamount} name="initialdepamount" placeholder="Enter initialdepamount*"
                                    onChange={handleInput}
                                />
                                {error.initialdepamount && <div><p className="error-text">{error.initialdepamount}</p></div>}
                            </div>

                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.idprooftype} name="idprooftype" placeholder="Enter idprooftype*"
                                    onChange={handleInput}
                                />
                                {error.idprooftype && <div><p className="error-text">{error.idprooftype}</p></div>}
                            </div>

                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.iddocnumber} name="iddocnumber" placeholder="Enter iddocnumber*"
                                    onChange={handleInput}
                                />
                                {error.iddocnumber && <div><p className="error-text">{error.iddocnumber}</p></div>}
                            </div>

                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.refaccholdername} name="refaccholdername" placeholder="Enter acc holdername*"
                                    onChange={handleInput}
                                />
                                {error.refaccholdername && <div><p className="error-text">{error.refaccholdername}</p></div>}
                            </div>

                            <div className="flex-item">
                                <input type="text" className="form-control" value={user.refaccholderaccnumber} name="refaccholderaccnumber" placeholder="Enter acc no*"
                                    onChange={handleInput}
                                />
                                {error.refaccholderaccnumber && <div><p className="error-text">{error.refaccholderaccnumber}</p></div>}
                            </div>

                        </div>
                        <div className="textarea-div">
                            <textarea rows="3" type="text" className="form-control flex-item" value={user.refaccholderaddress} name="refaccholderaddress" placeholder="Enter acc holder address*"
                                onChange={handleInput}
                            />
                            {error.refaccholderaddress && <div><p className="error-text">{error.refaccholderaddress}</p></div>}
                        </div>
                    </div>
                    <p class="p-note">* all fields are mandatory to fill</p>
                </div>
                <button type="submit" className="btn btn-outline-primary">Register</button>
            </form>
        </div>
    )
}
