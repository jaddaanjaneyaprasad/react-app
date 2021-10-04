import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'

export const Loan = () => {

    const cookies = new Cookies();
    let history = useHistory()
    const username=cookies.get('username')
    if(username==='' || username==null){
        history.push('/login')
    }

    const loans = ['Education', 'Personal/Home']

    const initParentValues = {
        loantype: '',
        loanamount: '',
        applydate: '',
        issuedate: '',
        rateofintrest: '',
        durationofloan: ''

    }

    const eduLoanValues = {
        coursefee: '',
        course: '',
        fathername: '',
        fatheroccupation: '',
        fathertotalexperince: '',
        fathercurrentexperience: '',
        rationcardno: '',
        annualincome: ''

    }

    const personalLoanValues = {
        annualincome: '',
        companyname: '',
        designation: '',
        totalexp: '',
        currentexp: ''

    }

    const [loan, setLoan] = useState(initParentValues)

    const [error, setError] = useState(initParentValues)

    const [eduloan, setEduLoan] = useState(eduLoanValues)

    const [eduerror, setEduError] = useState(eduLoanValues)

    const [personalLoan, setPersonalLoan] = useState(personalLoanValues)

    const [personalerror, setPersonalError] = useState(personalLoanValues)

    const handleInput = e => {
        setLoan({ ...loan, [e.target.name]: e.target.value })
    }

    const handleEduInput = e => {
        setEduLoan({ ...eduloan, [e.target.name]: e.target.value })
    }

    const handlePersonalInput = e => {
        setPersonalLoan({ ...personalLoan, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        let date = getDate()
        setLoan({ ...loan, applydate: date, issuedate: date })
        validateLoan()
        if (loan.loantype === "Education") {
            validateEdu()
            console.log(loan);
            console.log(eduloan);
        } else if (loan.loantype === "Personal/Home") {
            validatePersonal()
            console.log(loan);
            console.log(personalLoan);
        } else {
            console.log(loan);
        }
    }

    const validateLoan = () => {
        setError(initParentValues)
        validatePattern(loan.loanamount, 'loanamount', /^\d+$/, 'loan')
        validatePattern(loan.rateofintrest, 'rateofintrest', /^\d+$/, 'loan')
        validatePattern(loan.durationofloan, 'durationofloan', /^\d+$/, 'loan')

        validateDropdown(loan.loantype, 'loantype')
    }

    const validatePersonal = () => {
        setPersonalError(personalLoanValues)
        validatePattern(personalLoanValues.annualincome, 'annualincome', /^\d+$/, 'personal')
        validatePattern(personalLoanValues.companyname, 'companyname', /^[a-zA-Z ]+$/, 'personal')
        validatePattern(personalLoanValues.designation, 'designation', /^[a-zA-Z ]+$/, 'personal')
        validatePattern(personalLoanValues.totalexp, 'totalexp', /^\d+$/, 'personal')
        validatePattern(personalLoanValues.currentexp, 'currentexp', /^\d+$/, 'personal')
    }

    const validateEdu = () => {
        setEduError(eduLoanValues)

        validatePattern(eduLoanValues.coursefee, 'coursefee', /^\d+$/, 'education')
        validatePattern(eduLoanValues.course, 'course', /^[a-zA-Z ]+$/, 'education')
        validatePattern(eduLoanValues.fathername, 'fathername', /^[a-zA-Z ]+$/, 'education')
        validatePattern(eduLoanValues.fatheroccupation, 'fatheroccupation', /^[a-zA-Z ]+$/, 'education')
        validatePattern(eduLoanValues.fathertotalexperince, 'fathertotalexperince', /^\d+$/, 'education')
        validatePattern(eduLoanValues.fathercurrentexperience, 'fathercurrentexperience', /^\d+$/, 'education')
        validatePattern(eduLoanValues.rationcardno, 'rationcardno', /^[0-9a-zA-Z]*$/, 'education')
        validatePattern(eduLoanValues.annualincome, 'annualincome', /^\d+$/, 'education')

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

    const validatePattern = (val, inputType, pattern, errobj) => {

        if (val === '' || val == null) {

            if (errobj === 'education') {
                setEduError((error) =>
                    ({ ...error, [inputType]: `${inputType} is required` })
                )
            } else if (errobj === 'personal') {
                setPersonalError((error) =>
                    ({ ...error, [inputType]: `${inputType} is required` })
                )
            } else {
                setError((error) =>
                    ({ ...error, [inputType]: `${inputType} is required` })
                )
            }


        } else if (!pattern.test(val)) {

            if (errobj === 'education') {
                setEduError((error) =>
                    ({ ...error, [inputType]: `${inputType} is invalid` })
                )
            } else if (errobj === 'personal') {
                setPersonalError((error) =>
                    ({ ...error, [inputType]: `${inputType} is invalid` })
                )
            } else {
                setError((error) =>
                    ({ ...error, [inputType]: `${inputType} is invalid` })
                )
            }
        } else {

            if (errobj === 'education') {
                setEduError((error) =>
                    ({ ...error, [inputType]: `` })
                )
            } else if (errobj === 'personal') {
                setPersonalError((error) =>
                    ({ ...error, [inputType]: `` })
                )
            } else {
                setError((error) =>
                    ({ ...error, [inputType]: `` })
                )
            }
        }
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
                <div className="child-div">
                    <h3>Fill Loan Details</h3>
                    <div className="inner-div">
                        <div className="flex-item select-div">
                            <select className="form-select" name="loantype" value={loan.loantype} name="loantype" onChange={handleInput} >
                                <option value="default">Choose Loan Type</option>
                                {loans.map(loan => <option value={loan}>{loan}</option>)}
                            </select>
                            {error.loantype && <div><p className="error-text">{error.loantype}</p></div>}
                        </div>
                        <div className="flex-item">
                            <input type="number" className="form-control" name="loanamount" placeholder="Enter loan amount" value={loan.loanamount} name="loanamount" placeholder="Enter loan amount"
                                onChange={handleInput}
                            />
                            {error.loanamount && <div><p className="error-text">{error.loanamount}</p></div>}
                        </div>

                        <div className="flex-item">
                            <input type="number" className="form-control" name="rateofintrest" placeholder="Enter rateofintrest" value={loan.rateofintrest} name="rateofintrest" placeholder="Enter rateofintrest"
                                onChange={handleInput}
                            />
                            {error.rateofintrest && <div><p className="error-text">{error.rateofintrest}</p></div>}
                        </div>

                        <div className="flex-item">
                            <input type="number" className="form-control" name="durationofloan" placeholder="Enter duration" value={loan.durationofloan} name="durationofloan" placeholder="Enter duration"
                                onChange={handleInput}
                            />
                            {error.durationofloan && <div><p className="error-text">{error.durationofloan}</p></div>}
                        </div>

                        <div>
                            {loan.loantype !== 'default' && (loan.loantype === 'Education' ?
                                <div className="child-div">
                                    <h3>{loan.loantype} Loan</h3>
                                    <div className="inner-div">
                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={eduloan.coursefee} name="coursefee" placeholder="Enter CourseFee"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.coursefee && <div><p className="error-text">{eduerror.coursefee}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="text" className="form-control" value={eduloan.course} name="course" placeholder="Enter Course"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.course && <div><p className="error-text">{eduerror.course}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="text" className="form-control" value={eduloan.fathername} name="fathername" placeholder="Enter FatherName"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.fathername && <div><p className="error-text">{eduerror.fathername}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="text" className="form-control" value={eduloan.fatheroccupation} name="fatheroccupation" placeholder="Father Occupation"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.fatheroccupation && <div><p className="error-text">{eduerror.fatheroccupation}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={eduloan.fathertotalexperince} name="fathertotalexperince" placeholder="Father total exp"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.fathertotalexperince && <div><p className="error-text">{eduerror.fathertotalexperince}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={eduloan.fathercurrentexperience} name="fathercurrentexperience" placeholder="Father current exp"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.fathercurrentexperience && <div><p className="error-text">{eduerror.fathercurrentexperience}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="text" className="form-control" value={eduloan.rationcardno} name="rationcardno" placeholder="Enter rationcardno"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.rationcardno && <div><p className="error-text">{eduerror.rationcardno}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={eduloan.annualincome} name="annualincome" placeholder="Enter annualincome"
                                                onChange={handleEduInput}
                                            />
                                            {eduerror.annualincome && <div><p className="error-text">{eduerror.annualincome}</p></div>}
                                        </div>

                                    </div>
                                </div> :
                                <div className="child-div">
                                    <h3>{loan.loantype} Loan</h3>
                                    <div className="inner-div">
                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={personalLoan.annualincome} name="annualincome" placeholder="Enter Annual Income"
                                                onChange={handlePersonalInput}
                                            />
                                            {personalerror.annualincome && <div><p className="error-text">{personalerror.annualincome}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="text" className="form-control" value={personalLoan.companyname} name="companyname" placeholder="Enter CompanyName"
                                                onChange={handlePersonalInput}
                                            />
                                            {personalerror.companyname && <div><p className="error-text">{personalerror.companyname}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="text" className="form-control" value={personalLoan.designation} name="designation" placeholder="Enter Designation"
                                                onChange={handlePersonalInput}
                                            />
                                            {personalerror.designation && <div><p className="error-text">{personalerror.designation}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={personalLoan.totalexp} name="totalexp" placeholder="Enter TotalExp"
                                                onChange={handlePersonalInput}
                                            />
                                            {personalerror.totalexp && <div><p className="error-text">{personalerror.totalexp}</p></div>}
                                        </div>

                                        <div className="flex-item">
                                            <input type="number" className="form-control" value={personalLoan.currentexp} name="currentexp" placeholder="Enter Current Exp"
                                                onChange={handlePersonalInput}
                                            />
                                            {personalerror.currentexp && <div><p className="error-text">{personalerror.currentexp}</p></div>}
                                        </div>

                                    </div>
                                </div>)}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Apply Loan</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
