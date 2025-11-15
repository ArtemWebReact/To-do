import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from "firebase/auth";
import './style2.css';
export function RegisterAuth(){
    const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()
    const register = async() =>{
        try{
     await createUserWithEmailAndPassword(auth, email, password)
     alert("you registred ")
    navigate('/tasks')
        }
        catch(err){
            console.error(err)
        }
    }
    return(
        <>
  <section className="section2">
        <img src="/images/robot.png" alt="Robot" className="img" />

        <div className="card2">
            <div className="login">
            <h2>Register</h2>
            <h3>Please register to continue</h3>
            </div>
        <input placeholder="email" onChange={(event)=>{
        setEmail(event.target.value)
        }} className="input2"></input>
        <input placeholder="password" className="input2" type="password" onChange={(event)=>{
        setPassword(event.target.value)
        }} ></input>
        <button onClick = {register}  className="button3">Sign up</button>
             <h4>Already have an account? Then <a style={{color:'red'}} href = "/login">log in</a></h4>
        </div>
        </section>
        </>
    )
}