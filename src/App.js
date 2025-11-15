import logo from './logo.svg';
import './style.css';
import { RegisterAuth } from './auth/register';
import { LoginAuth } from './auth/login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './home'; 
import LogoutAuth from './auth/logout';
import { Database } from './database/getTasks';
import { CreateTask } from './database/createTask';
function App() {
  return (
    <>
<section className='layoult'>
<BrowserRouter>
<header className='header'>
  <h1>Organizer</h1>
<Link to = "/" className='Link'><button className="button"><span>Home</span></button></Link>
<Link to = "/register" className='Link'><button className="button"><span>Register</span></button></Link>
<Link to = "/login" className='Link'><button className="button"><span>Login</span></button></Link>
<Link to = "/tasks" className='Link'><button className="button"><span>My tasks</span></button></Link>
<LogoutAuth/>
</header>

<Routes>
  
  <Route path = '/' element = {<Home/>}  className='Link' ></Route>
  <Route path = '/register' element = {<RegisterAuth/>}  className='Link'></Route>
  <Route path = '/login' element = {<LoginAuth/>}  className='Link'></Route>
  <Route path = '/createTask' element = {<CreateTask/>}  className='Link'></Route>
    <Route path = '/tasks' element = {<Database/>}  className='Link2'></Route>
</Routes>
</BrowserRouter>
</section>
  </>
  );
}

export default App;
