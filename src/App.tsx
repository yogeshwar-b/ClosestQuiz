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
      <div>Closest Quiz</div>
      <div>
        {questionIndex < QuestionData.length ? (
          <Question
            qText={QuestionData[questionIndex].question}
            key={questionIndex}
          />
        ) : (
          <>No More Questions</>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {GuessList?.map((G, index) => {
            return index != winnerIndex ? (
              <div>
                {G.GuessName} has guess {G.GuessText}
              </div>
            ) : (
              <div
                style={{ border: 'green', borderStyle: 'dotted' }}
                key={index}
              >
                <div>
                  {G.GuessName} is winner with guess {G.GuessText}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <GuessBox AddGuess={AddGuess} />
      <button
        onClick={() => {
          console.log(`submitting quetsion ${questionIndex}`)
          if (winnerIndex == -1)
            setWinnerIndex(ComputeWinner(questionIndex, GuessList))
        }}
      >
        Get Winner
      </button>

      <button
        onClick={() => {
          setQuestionIndex(questionIndex + 1)
          ResetGuess()
          setWinnerIndex(-1)
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
  function ResetGuess() {
    dispatch({ type: 'reset', data: { GuessName: '', GuessText: -1 } })
  }
  function GuessReducer(GuessList: Guess[], action: action) {
    switch (action.type) {
      case 'add':
        console.log(`added ${action.data.GuessName} , ${action.data.GuessText}`)
        return [...GuessList, action.data]
      case 'reset':
        return []
      default:
        return GuessList
    }
  }
}

interface QuestionProps {
  qText: string
}
const Question = ({ qText }: QuestionProps) => {
  return (
    <p
      style={{ fontWeight: 'bolder', fontSize: '2.5rem', textAlign: 'center' }}
    >
      {qText}
    </p>
  )
}

interface GuessBoxProps {
  AddGuess: (data: Guess) => void
}

const GuessBox = ({ AddGuess }: GuessBoxProps) => {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const guessRef = useRef<HTMLInputElement | null>(null)
  return (
    <div style={{ display: 'flex', gap: '.3rem' }}>
      <input
        type='text'
        placeholder='name'
        ref={nameRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key == 'Enter' || e.key == 'tab') {
            guessRef.current?.focus()
          }
        }}
      />
      <input
        type='number'
        placeholder='guess'
        ref={guessRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key == 'Enter') {
            guessRef.current?.focus()
            AddGuess({
              GuessName: nameRef.current ? nameRef.current.value : '',
              GuessText: guessRef.current ? Number(guessRef.current.value) : -1
            })
            if (nameRef.current) nameRef.current.value = ''
            if (guessRef.current) guessRef.current.value = ''
            nameRef.current?.focus()
          }
        }}
      />
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
    </div>
  )
}
