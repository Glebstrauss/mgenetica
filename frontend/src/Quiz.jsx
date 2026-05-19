import React, {useState} from 'react'
import { submitQuiz } from './lib/appwrite'

export default function Quiz({ t }){
  const [answers, setAnswers] = useState([false,false,false])
  const submit = async ()=>{
    const data = await submitQuiz(1, answers)
    alert(t('quiz.score', { score: data.score, total: data.total }))
  }
  return (
    <div>
      <h3>{t('quiz.title')}</h3>
      {answers.map((v,i)=> (
        <div key={i}>
          <label>
            <input type="checkbox" checked={v} onChange={e=>{ const a = [...answers]; a[i]=e.target.checked; setAnswers(a)}} /> {t('quiz.question', { index: i + 1 })}
          </label>
        </div>
      ))}
      <button onClick={submit}>{t('quiz.submit')}</button>
    </div>
  )
}
