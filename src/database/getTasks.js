// Імпорти Firebase та React
import { db } from "../config/firebase";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import './style1.css';

// Головний компонент
export function Database() {
    // Стейти та рефи
    const card2 = useRef('');
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const auth = getAuth();
    const [indexCard, setIndexCard] = useState('');
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const collection1 = collection(db, "tasks");
    const [data, setData] = useState([]);
    const [readyHTMLData, setReadyHTMLData] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newText, setNewText] = useState('');
    const collectionTasks = collection(db, "tasks");
    const [update, setUpdate] = useState(0);
    const [id, setId] = useState('')
      const [color, setColor] = useState(undefined)
      const [checked, setChecked] = useState(false)
 const [done, setDone] = useState("You need to do this task")

    // Додавання нового документа
    const inputField = async () => {
        try {
            await addDoc(collection1, {
                task: '',
                'additional text': '',
                checked: false,
                userId: auth.currentUser.uid
            });
            setUpdate((number) => (number + 1));
        } catch (err) {
            console.error();
        }
    };

    // Оновлення документа
    const updateTask = async (id) => {
        try {
            const task1 = doc(db, 'tasks', id);
            await updateDoc(task1, {
                task: newTask,
                'additional text': newText,
                checked: checked,
                userId: auth.currentUser.uid
            });
            getData();
        } catch (err) {
            console.error(err);
        }
    };

    // Видалення документа
    const deleteDoc1 = async (id) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            await deleteDoc(taskDoc);
            getData();
        } catch (err) {
            console.error(err);
        }
    };

    // Отримання даних з Firestore//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getData = async () => {
       try {
                if (auth.currentUser) {
                    const uid = auth.currentUser.uid;
                    const q = query(collection(db, "tasks"), where("userId", "==", uid));
                    const tasks = await getDocs(q);
                    setData(tasks.docs);

                    let array = tasks.docs.map((el) => ({
                        ...el.data(),
                        id: el.id,
                        checked: el.checked,
                        userId: uid
                    }));
     let x = localStorage.getItem(`pageX ${id}`);
    let y = localStorage.getItem(`pageY ${id}`);                  
                    setReadyHTMLData(array.map((el, index) => {
                        console.log(el['checked'])
                        return(
                        <>
                            <div
                                className="card"
                                style={{
                       "top": localStorage.getItem(`pageY ${id}`) + 'px',
                       "left": localStorage.getItem(`pageX ${id}`) + 'px',
                                }}
                                key={index}
                                onClick={(e) => {
                                    setIndexCard(index)
                                    setId(el.id)
                                    console.log(el.id)
                                        e.stopPropagation();
                                }}
                            >
                                    <input type = "checkbox" onChange = {(e)=>{
    if(el['checked'] == false){
      setChecked(true)
      console.log(checked)
        updateTask(el.id);
        e.target.parentNode.style.backgroundColor = "green"
    }
    else{
        setChecked(false)
        updateTask(el.id)
              console.log(checked)
                e.target.parentNode.style.backgroundColor = "red"
    }
       e.stopPropagation();
    }}></input>
                                <p>{el['checked']? "The task is done" : "An unfinished task"}</p>
                                <p>{el['task']}</p>
                                <p>{el['additional text']}</p>
                                <div id="inputs" className="none">
                           <input type = "checkbox" 
                           checked = {el.checked}
                           onChange = {(e)=>{
    if(el['checked'] == false){
      setChecked(true)
      console.log(checked)
      
    }
    else{
        setChecked(false)
              console.log(checked)
    }
       e.stopPropagation();
    }}></input>
                                    <input onChange={(e) => {setNewTask(e.target.value)
                                            e.stopPropagation();
                                    }}></input>
                                    <input onChange={(e) => {setNewText(e.target.value)
                                            e.stopPropagation();
                                    }}></input>
                                </div>
                                <div className="buttons">
                                    <button className="buttonUpdate" onClick={(e) => {
                                        deleteDoc1(el.id);
                                        e.stopPropagation();
                                    }}>🗑️</button>
                                    <button className="buttonUpdate" id="second" onClick={(e) => {
                                        e.target.className = 'button0';
                                        e.target.nextSibling.className = "buttonUpdate";
                                        e.target.parentNode.previousElementSibling.className = "visible";
                                        e.stopPropagation();
                                        setIndexCard('');
                                    }}>✏️</button>
                                    <button className="button0" id="first" onClick={(e) => {
                                        updateTask(el.id);
                                        e.target.className = "button0";
                                        e.target.previousElementSibling.className = "buttonUpdate";
                                        e.target.parentNode.previousElementSibling.className = "none";
                                        e.stopPropagation();
                                        setIndexCard('');
                                    }}>✅</button>
                                </div>
                            </div>
                        </>
                )}));
                    console.log(array);
                }
            } catch (err) {
                console.error(err);
            }
        };
    

    // Переміщення картки


const move = () => {
  if (!id) return; // якщо жодна картка не вибрана — нічого не робимо
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (card) {
    card.style.left = mouseX + 'px';
    card.style.top = mouseY + 'px';
  }
};


              const dblclick = () => {
                if (!id) return; // не зберігаємо, якщо не вибрана карточка

    const card = document.querySelectorAll(`.card[data-id="${id}"]`);
    const section1 = document.querySelector('.section1');
    document.removeEventListener('mousemove', move);
    localStorage.setItem(`pageX ${id}`, mouseX);
    localStorage.setItem(`pageY ${id}`, mouseY);
    setId('');
    setIndexCard('')
  };
    // Ефект при завантаженні////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
         const section1 = document.querySelector('.section1');
         const offsetX = mouseX - left;
      const offsetY = mouseY - top;
               document.addEventListener('mousemove', (event) => {
        console.log('x:' + event.pageX + ' ' + 'y:' + event.pageY);
        setMouseX(event.pageX );
        setMouseY(event.pageY); 
    });
  

            
    // Відстеження координат миші

        document.addEventListener('mousemove', move);
     
        document.addEventListener('mouseup', dblclick);

        const getData = async () => {
            try {
                if (auth.currentUser) {
                    const uid = auth.currentUser.uid;
                    const q = query(collection(db, "tasks"), where("userId", "==", uid));
                    const tasks = await getDocs(q);
                    setData(tasks.docs);

                    let array = tasks.docs.map((el) => ({
                        ...el.data(),
                        id: el.id,
                        userId: uid
                    }));
     let x = localStorage.getItem(`pageX ${id}`);
    let y = localStorage.getItem(`pageY ${id}`);
      const offsetX = mouseX - left;
      const offsetY = mouseY - top;
                    setReadyHTMLData(array.map((el, index) => (
                        
                        <>
                  
           <div
  className="card"
  data-id={el.id}
  style={{
    top: (localStorage.getItem(`pageY ${el.id}`) ) + 'px',
    left:  (localStorage.getItem(`pageX ${el.id}`)  ) + 'px',
    backgroundColor: (localStorage.getItem(`color + ${el.id}`)) || 'red'
  }}
  key={index}
  onMouseDown={(e) => {
    setId(el.id); // важливо, щоб при кліку зберігався id
    setLeft(e.target.style.left)
    setTop(e.target.style.top)
    setIndexCard(index);

  }}
  onClick={(e)=>{
    localStorage.setItem(`color + ${el.id}`, color)
        e.stopPropagation();
    e.target.style.backgroundColor = color
    setColor(undefined)
  }}
>
  <input type = "checkbox" checked = {el.checked} onChange = {(e)=>{
    if(el['checked'] == false){
      setChecked(true)
      console.log(checked)
        updateTask(el.id);
        setColor('green')
    }
    else{
        setChecked(false)
        updateTask(el.id)
        
              console.log(checked)
               setColor('red')
    }
       e.stopPropagation();
    }}></input>
                                <p>{el['checked']== false ? "An unfinished task" : "The task is done"}</p>
                                <p>{el['task']}</p>
                                <p>{el['additional text']}</p>
                                <div id="inputs" className="none">
                                   
    
                                    <input onChange={(e) => {setNewTask(e.target.value)
                                            e.stopPropagation();
                                    }
                                    }></input>
                                    <input onChange={(e) => {setNewText(e.target.value)
                                            e.stopPropagation();
                                    }
                                }></input>
                                </div>
                                <div className="buttons">
                                    <button className="buttonUpdate" onClick={(e) => {
                                        deleteDoc1(el.id);
                                        e.stopPropagation();
                                    }}>🗑️</button>
                                    <button className="buttonUpdate" id="second" onClick={(e) => {
                                        e.target.className = 'button0';
                                        e.target.nextSibling.className = "buttonUpdate";
                                        e.target.parentNode.previousElementSibling.className = "visible";
                                        e.stopPropagation();
                                        setIndexCard('');
                                    }}>✏️</button>
                                    <button className="button0" id="first" onClick={(e) => {
                                        updateTask(el.id);
                                        e.target.className = "button0";
                                        e.target.previousElementSibling.className = "buttonUpdate";
                                        e.target.parentNode.previousElementSibling.className = "none";
                                        e.stopPropagation();
                                        setIndexCard('');
                                    }}>✅</button>
                                </div>
                            </div>
                            
                        </>
                    )));
                    console.log(array);
                }
            } catch (err) {
                console.error(err);
            }
        };

        getData();
    },[mouseX]);

    // Рендер
    return (
        <>
            <section className="section1">
                <nav className="navigation">
                    <ul>
                        <li onClick={inputField}>+ Add new task</li>
                        <div className="palette">
                        <li style = {{
                    
                        }} onClick = {()=>{
                            if(document.querySelector('#changeColor').style.display == "none"){
                       document.querySelector('#changeColor').style.display = "block"
                        }
                    else{
                        document.querySelector('#changeColor').style.display = "none"
                    }}}
                       >🎨Color</li>
                        <input placeholder="color" id = "changeColor" onChange={(e)=>{
                            setColor(e.target.value)
                        }}></input>
                        </div>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
                <div className="tasks">
                    {readyHTMLData}
                </div>
            </section>
        </>
    );
}
