import '../styles/App.css'

export const App = () => {
  return (
    <div className='App'>
      {' '}
      <div>This is App</div>
      <Question qText='Here goes question' />
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
