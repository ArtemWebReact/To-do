import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import './style2.css';
export default function LogoutAuth(){
    const logout = async() => {
    try{
        await signOut(auth)
        alert("you signed out ")
    }
    catch(err){
        console.error(err)
    }
    }
    return(
        <>
        <button onClick ={logout} className="button"><span>Log out</span></button>
        </>
    )
}