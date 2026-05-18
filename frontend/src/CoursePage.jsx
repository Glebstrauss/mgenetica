import React from 'react'

export default function CoursePage({course}){
  return (
    <section>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
    </section>
  )
}
