
import { AuthState } from "../store/slices/authSlice"

export default interface RootState {
    reactRed: ReactState;
    auth: AuthState,
  }
  export interface ToDo {
    id: string;
    completed: boolean;
    text: string
  }
  
export interface ReactState {
    error: string | null
    selectedCandidateId: null | number,
    vote_id: number | null;
    your_vote_id: number | null
}
export interface IPresident {
  id: number,
  president: string;
  party: string;
  description: string;
}
export interface IVerify {
  codeClient: string
}
export interface Code {
  codeServer: string
}
export interface AuthData {
  email: string;
  password: string
}

export interface IJwt {
  token: string
}

export interface IVote {
  candidateId: number;
  username: string;
}

export interface Data {
  token: string;
  email: string
}
export interface DataReg {
  data: string;
}
export interface DataAction {
  _email: string;
  _password: string;
}
export interface VotePercentages {
  percentageResults: Record<number, number>;
}
export interface SecretData {
  message: string,
  user_email: string
}