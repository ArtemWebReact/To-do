import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import './style2.css';
export function LoginAuth(){
    const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()
    const register = async() =>{
        try{
     await signInWithEmailAndPassword(auth, email, password)
     alert("you signed in ")
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
            <h2>Log in</h2>
            <h3>Please log in to continue</h3>
            </div>
        <input placeholder="email" onChange={(event)=>{
        setEmail(event.target.value)
        }} className="input2"></input>
        <input placeholder="password" className="input2" type="password" onChange={(event)=>{
        setPassword(event.target.value)
        }} ></input>
        <button onClick = {register}  className="button3">Sign in</button>
        <h4>Don't have an account? Then <a style={{color:'red'}} href = "/register">sign up</a></h4>
        </div>
        </section>
        </>
    )
}