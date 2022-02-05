import { Quiz } from "../../data"
import { InitialUserDetailsState, UserDetailsAction } from "../../reducers/userDetail/userDetail.reducer.types"

export type InitialUserDetailsContext = {
    userDetailsState: InitialUserDetailsState,
    userDetailsDispatch: (action: UserDetailsAction) => void,
}

export type UserSolvedQuizzes = {
    quizId: Quiz;
    score: number;
}

export type UserDetails ={
    _id: string,
    totalScore: number,
    knowledgeLevel: number
    solvedQuizzes: UserSolvedQuizzes[]
}