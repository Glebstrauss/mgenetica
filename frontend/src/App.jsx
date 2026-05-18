import React, {useEffect, useState} from 'react'
import CoursePage from './CoursePage'
import Quiz from './Quiz'
import { pingAppwrite, listCourses, createEmailSession, deleteSession, getAccount } from './lib/appwrite'

export default function App(){
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    pingAppwrite().catch(()=>{})
    // check session
    getAccount().then(u=>setUser(u)).catch(()=>setUser(null))
    listCourses().then(setCourses).catch(()=>setCourses([]))
  },[])

  async function handleLogin(e){
    e.preventDefault();
    try{
      await createEmailSession(email, password)
      const u = await getAccount()
      setUser(u)
      // refresh courses now as authenticated
      listCourses().then(setCourses).catch(()=>setCourses([]))
    }catch(err){
      alert('Login failed: '+(err.message||err))
    }
  }

  async function handleLogout(){
    try{
      await deleteSession()
      setUser(null)
      listCourses().then(setCourses).catch(()=>setCourses([]))
    }catch(err){
      console.error(err)
    }
  }

  if(showQuiz) return (<div style={{padding:20}}><button onClick={()=>setShowQuiz(false)}>Back</button><Quiz/></div>)
  return (
    <div style={{fontFamily:'system-ui, sans-serif', padding:20}}>
      <header>
        <h1>MGenética — Learner Dashboard</h1>
        <div style={{float:'right'}}>
          {user ? (
            <div>
              <span>Signed in as {user.email || user.name || user.$id}</span>
              <button onClick={handleLogout} style={{marginLeft:10}}>Logout</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} style={{display:'inline-block'}}>
              <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </header>
      <main>
        <section>
          <h2>Courses</h2>
          <ul>
            {courses.map(c=> (
              <li key={c.id}><a href="#" onClick={(e)=>{e.preventDefault(); setSelected(c)}}>{c.title}</a> {c.published? '(live)':'(draft)'} <button onClick={()=>setShowQuiz(true)}>Quiz</button></li>
            ))}
          </ul>
          {selected && <CoursePage course={selected} />}
        </section>
      </main>
    </div>
  )
}
