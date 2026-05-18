import React, {useState} from 'react'
import { submitQuiz } from './lib/appwrite'

export default function Quiz(){
  const [answers, setAnswers] = useState([false,false,false])
  const submit = async ()=>{
    const data = await submitQuiz(1, answers)
    alert(`Score: ${data.score}/${data.total}`)
  }
  return (
    <div>
      <h3>Sample Quiz</h3>
      {answers.map((v,i)=> (
        <div key={i}>
          <label>
            <input type="checkbox" checked={v} onChange={e=>{ const a = [...answers]; a[i]=e.target.checked; setAnswers(a)}} /> Question {i+1}
          </label>
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  )
}
