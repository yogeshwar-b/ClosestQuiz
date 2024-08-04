import '../styles/App.css'
import { QuestionData } from './questions'

export const App = () => {
  return (
    <div className='App'>
      <div>This is App</div>
      <div>
        {QuestionData.map((q) => {
          return <Question qText={q.question} />
        })}
      </div>

      <button>Submit</button>
    </div>
  )
}

interface QuestionProps {
  qText: string
}
const Question = ({ qText }: QuestionProps) => {
  return <>{qText}</>
}
