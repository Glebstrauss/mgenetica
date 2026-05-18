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
    <div className="page-layout-full">
      <header className="navbar">
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 1rem'}}>
          <div className="navbar-brand">
            <img src="/../images/logo.png" alt="MGenética" onError={(e)=>{e.target.style.display='none'}} />
            <div className="navbar-title">MGenética</div>
          </div>
          <div>
            {user ? (
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span>Signed in as {user.email || user.name || user.$id}</span>
                <button className="btn btn-secondary" onClick={handleLogout} style={{marginLeft:10}}>Logout</button>
              </div>
            ) : (
              <form onSubmit={handleLogin} style={{display:'flex',gap:8,alignItems:'center'}}>
                <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="content" style={{maxWidth:1200,margin:'1.5rem auto',padding:'0 1rem'}}>
        <section>
          <h2>Courses</h2>
          <div className="module-grid">
            {courses.map(c=> (
              <div key={c.id} className="module-card">
                <p>{c.published? 'module' : 'draft'}</p>
                <a href="#" onClick={(e)=>{e.preventDefault(); setSelected(c)}}>{c.title}</a>
                <p style={{marginTop:10}}>{c.description}</p>
                <div style={{marginTop:12}}>
                  <button className="btn btn-primary" onClick={()=>setShowQuiz(true)}>Open Quiz</button>
                </div>
              </div>
            ))}
          </div>
          {selected && <CoursePage course={selected} />}
        </section>
      </main>
    </div>
  )
}
