import {
  UserDetails,
  UserSolvedQuizzes,
} from "../../contexts/user/userDetails.types";
import { Status } from "../../contexts/utils.types";

export type InitialUserDetailsState = {
  _id: string;
  knowledgeLevel: number;
  totalScore: number;
  solvedQuizzes: UserSolvedQuizzes[];
  status: Status;
};

export type UserDetailsAction =
  | { type: "SET_USER_DETAILS"; payload: { data: UserDetails } }
  | { type: "SET_STATUS"; payload: { status: Status } }
  | { type: "SET_SCORE"; payload: { solvedQuiz: UserSolvedQuizzes } }
  | { type: "UPDATE_SCORE"; payload: { quizId: string; score: number } }
  | {
      type: "SET_USER_CREDITS";
      payload: { knowledgeLevel: number; totalScore: number };
    }
  | {
      type: "UPDATE_USER_CREDITS";
      payload: { knowledgeLevel: number; totalScore: number };
    };
