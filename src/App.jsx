import React from 'react'
import Quiz from './components/Quiz/Quiz'
import { jsQuizz } from './questions'

const App = () => {
  return (

    <Quiz questions={jsQuizz.questions}/>

  )
}

export default App