import { SetStateAction, useReducer, useRef, useState } from 'react'
import '../styles/App.css'
import { QuestionData } from './questions'
import { Guess } from '../types/commontypes'
import { ComputeWinner } from '../helper/ComputeWinner'

export const App = () => {
  const [GuessList, dispatch]: [Guess[], React.Dispatch<action>] = useReducer(
    GuessReducer,
    []
  )
  const [questionIndex, setQuestionIndex]: [
    number,
    React.Dispatch<SetStateAction<number>>
  ] = useState<number>(0)

  const [winnerIndex, setWinnerIndex]: [
    number,
    React.Dispatch<SetStateAction<number>>
  ] = useState<number>(-1)
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
        {GuessList?.map((G, index) => {
          return index != winnerIndex ? (
            <div>
              {G.GuessName} has guess {G.GuessText}
            </div>
          ) : (
            <div style={{ border: 'green', borderStyle: 'dotted' }} key={index}>
              {/* <GuessBox AddGuess={AddGuess} /> */}
              <div>
                {G.GuessName} is winner with guess {G.GuessText}
              </div>
            </div>
          )
        })}
      </div>
      <GuessBox AddGuess={AddGuess} />
      <button
        onClick={() => {
          console.log(`submitting quetsion ${questionIndex}`)
          if (winnerIndex == -1)
            setWinnerIndex(ComputeWinner(questionIndex, GuessList))
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
            AddGuess({
              GuessName: nameRef.current ? nameRef.current.value : '',
              GuessText: guessRef.current ? Number(guessRef.current.value) : -1
            })
            if (nameRef.current) nameRef.current.value = ''
            if (guessRef.current) guessRef.current.value = ''
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
