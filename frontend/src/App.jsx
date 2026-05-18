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
            <img src="/../images/mgenetica-logo-correct.png" alt="MGenética" onError={(e)=>{e.target.style.display='none'}} />
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
        {/* Hero (from original index.qmd) */}
        <section className="home-hero" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'2rem',alignItems:'center'}}>
          <div className="home-hero-copy">
            <div className="home-kicker">Educação aplicada · Melhoramento genético animal</div>
            <div className="home-title">Genética que vira decisão no campo.</div>
            <div className="home-summary">Estude genética quantitativa e genômica aplicada com uma trilha curta, prática e verificável: conceito, dados simulados, código em R e interpretação técnica.</div>
            <div className="home-actions" style={{marginTop:16}}>
              <a className="btn btn-primary" href="#" onClick={(e)=>{e.preventDefault(); /* navigate to first module */}}>Acessar curso</a>
              <a className="btn btn-secondary" href="#" style={{marginLeft:8}}>Ver módulos</a>
            </div>
          </div>
          <div className="home-hero-mark">
            <img src="/../images/mgenetica-logo-correct.png" alt="MGenética" style={{maxWidth:320}} />
          </div>
        </section>

        {/* Paths / Cards */}
        <section className="home-paths" style={{marginTop:24}}>
          <div className="home-path-card">
            <div className="path-label">01</div>
            <h3>Estudar</h3>
            <p>Siga os módulos em ordem, com uma pergunta técnica por sessão.</p>
            <a className="entry-link" href="#" aria-label="Começar pelo Módulo 01">Começar M01</a>
          </div>
          <div className="home-path-card" style={{marginLeft:12}}>
            <div className="path-label">02</div>
            <h3>Praticar</h3>
            <p>Use dados simulados e scripts em R para transformar conceito em evidência.</p>
            <a className="entry-link" href="#">Explorar trilha</a>
          </div>
          <div className="home-path-card" style={{marginLeft:12}}>
            <div className="path-label">03</div>
            <h3>Concluir</h3>
            <p>Valide os quizzes e emita o certificado quando a trilha estiver completa.</p>
            <a className="entry-link" href="#">Ver certificado</a>
          </div>
        </section>

        {/* Curriculum */}
        <section className="home-curriculum" style={{marginTop:24}}>
          <div className="section-eyebrow">Trilha</div>
          <h2>Do fundamento biológico à genômica aplicada</h2>
          <div className="home-curriculum-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginTop:12}}>
            <div className="home-curriculum-item">Fundamentos</div>
            <div className="home-curriculum-item">Parâmetros</div>
            <div className="home-curriculum-item">Modelos</div>
            <div className="home-curriculum-item">Genômica</div>
          </div>
          <div style={{marginTop:12}}>
            <a className="btn btn-secondary" href="#">Ver os 12 módulos</a>
          </div>
        </section>

        {/* Proof strip */}
        <section className="home-proof-strip" style={{display:'flex',gap:12,marginTop:24}}>
          <div className="home-proof-item"><strong>Rigor científico</strong><p>Conteúdo baseado em genética quantitativa, estatística e aplicação no campo.</p></div>
          <div className="home-proof-item"><strong>Linguagem clara</strong><p>Explicações diretas, sem excesso de jargão e com interpretação curta.</p></div>
          <div className="home-proof-item"><strong>Prática reproduzível</strong><p>Scripts e dados simulados para estudar sem depender de bases externas.</p></div>
        </section>

        {/* Dynamic modules preview using courses data */}
        <section style={{marginTop:32}}>
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
        </section>

        {/* Final CTA */}
        <section className="home-final-cta" style={{marginTop:32}}>
          <h3>Pronto para começar?</h3>
          <p>Abra o primeiro módulo, rode o script principal e feche a sessão com uma decisão técnica.</p>
          <div style={{marginTop:12}}>
            <a className="btn btn-primary" href="#">Acessar Módulo 01</a>
            <a className="btn btn-secondary" href="#" style={{marginLeft:8}}>Planejar 12 semanas</a>
          </div>
        </section>

      </main>
    </div>
  )
}
