import React, {useEffect, useState} from 'react'

export default function App(){
  const [courses, setCourses] = useState([])
  useEffect(()=>{
    fetch('/courses').then(r=>r.json()).then(setCourses).catch(()=>setCourses([]))
  },[])
  return (
    <div style={{fontFamily:'system-ui, sans-serif', padding:20}}>
      <header>
        <h1>MGenética — Learner Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Courses</h2>
          <ul>
            {courses.map(c=> (
              <li key={c.id}>{c.title} {c.published? '(live)':'(draft)'}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
