import React from 'react';
import { Link } from "react-router-dom";


const Form = ({title, setEmail, setPassword, handleAction}) => {
    return (
        <div className='form_container'>
            <div className='form_center' /*center*/>
                <h1>{title} Form</h1>
                <div className='card_login' /*form*/>
                    <div className='form_text'>
                        <input type="text" required onChange={(e) => setEmail(e.target.value)} />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className='form_text'>
                        <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <button className='form_button' onClick={handleAction}>{title}</button>
                    <div className='signup_link'>
                        {
                            title === "Log in" ? (
                                <p>Dont have an account ? <Link to="/signup"><span className="cursor-pointer font-extrabold hover:text-teal-400 duration-300" >Sign up</span></Link></p>
                            ) : (
                                <p>Already have an account,  <Link to="/login"><span className="cursor-pointer font-extrabold hover:text-teal-400 duration-300" >Log in</span></Link></p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form