import { SetStateAction, useReducer, useRef, useState } from 'react'
import '../styles/App.css'
import { QuestionData } from './questions'

interface Guess {
  GuessText: string
  GuessName: string
}

export const App = () => {
  const [GuessList, dispatch]: [Guess[], React.Dispatch<action>] = useReducer(
    GuessReducer,
    [{ GuessText: '', GuessName: '' }]
  )
  const [questionIndex, setQuestionIndex]: [
    number,
    React.Dispatch<SetStateAction<number>>
  ] = useState<number>(0)
  return (
    <div className='App'>
      <div>This is App</div>
      <div>
        {questionIndex < QuestionData.length ? (
          <Question
            qText={QuestionData[questionIndex].question}
            key={questionIndex}
          />
        ) : (
          <>No More Questions</>
        )}
      </div>

      {GuessList?.map(() => {
        return <GuessBox AddGuess={AddGuess} />
      })}
      <button
        onClick={() => {
          console.log(`submitting quetsion ${questionIndex}`)
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          setQuestionIndex(questionIndex + 1)
        }}
      >
        Next
      </button>
    </div>
  )

  interface action {
    type: string
    data: Guess
  }

  function AddGuess(data: Guess) {
    dispatch({ type: 'add', data: data })
  }
  function GuessReducer(GuessList: Guess[], action: action) {
    switch (action.type) {
      case 'add':
        console.log(`added ${action.data.GuessName} , ${action.data.GuessText}`)
        return [...GuessList, action.data]
      default:
        return GuessList
    }
  }
}

interface QuestionProps {
  qText: string
}
const Question = ({ qText }: QuestionProps) => {
  return <>{qText}</>
}

interface GuessBoxProps {
  AddGuess: (data: Guess) => void
}

const GuessBox = ({ AddGuess }: GuessBoxProps) => {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const guessRef = useRef<HTMLInputElement | null>(null)
  return (
    <div>
      <input type='text' placeholder='name' ref={nameRef} />
      <input type='text' placeholder='guess' ref={guessRef} />
      {!nameRef.current?.value || !guessRef.current?.value ? (
        <button
          onClick={() => {
            AddGuess({ GuessName: 'test', GuessText: 'adf' })
          }}
        >
          Add
        </button>
      ) : (
        <></>
      )}
    </div>
  )
}
