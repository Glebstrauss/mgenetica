import React, {useEffect, useState} from 'react'
import CoursePage from './CoursePage'
import Quiz from './Quiz'
import { pingAppwrite, listCourses } from './lib/appwrite'

export default function App(){
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  useEffect(()=>{
    pingAppwrite().catch(()=>{})
    listCourses().then(setCourses).catch(()=>setCourses([]))
  },[])
  if(showQuiz) return (<div style={{padding:20}}><button onClick={()=>setShowQuiz(false)}>Back</button><Quiz/></div>)
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
              <li key={c.id}><a href="#" onClick={(e)=>{e.preventDefault(); setSelected(c)}}>{c.title}</a> {c.published? '(live)':'(draft)'} <button onClick={()=>setShowQuiz(true)}>Quiz</button></li>
            ))}
          </ul>
          {selected && <CoursePage course={selected} />}
        </section>
      </main>
    </div>
  )
}
