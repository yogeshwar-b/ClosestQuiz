import { Guess } from '../types/commontypes'
import { QuestionData } from '../src/questions'

export function ComputeWinner(
  QuestionIndex: number,
  GuessList: Guess[]
): number {
  GuessList.sort((g) => g.GuessText)
  let minseen = Infinity
  let ans = -1
  for (let i = 0; i < GuessList.length; i++) {
    if (
      minseen >
      Math.abs(GuessList[i].GuessText - QuestionData[QuestionIndex].answer)
    ) {
      minseen = Math.abs(
        GuessList[i].GuessText - QuestionData[QuestionIndex].answer
      )
      ans = i
    }
  }
  console.log(GuessList)
  return ans
}
