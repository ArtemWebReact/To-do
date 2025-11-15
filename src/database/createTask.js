import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
export function CreateTask(){
    const collection1 = collection(db, "tasks")
const [task, setTask] = useState('')
const [additionalText , setAdditionalText] = useState('')
const [update, setUpdate] = useState(0)

const addTask = async()=>{
    try{
    await addDoc(collection1, {
        task: task,
        'additional text':additionalText
    })
    setUpdate((number)=>(number + 1))
    }
    catch(err){
        console.error()
    }
    }
    useEffect(()=>{
    console.log('update')
}, [update])
    return(
        <>
        <input onChange={(e)=>{
            setTask(e.target.value)
        }}></input>
            <input onChange={(e)=>{
            setAdditionalText(e.target.value)
        }}></input>
        <button onClick={addTask}>Create Task</button>
        </>
    )
}