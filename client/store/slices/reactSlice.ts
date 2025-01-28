import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { ReactState } from "../../src/types";
 
const reactSlice = createSlice({
    name: "ReactSl",
    initialState: {
        error: null,
       selectedCandidateId: null,
       vote_id: null,
       your_vote_id: null
    } as ReactState ,
    reducers: {
        setError (state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setSelectedCandidateId (state, action:PayloadAction<null | number>) {
            state.selectedCandidateId = action.payload
        },
        setVoteId (state, action: PayloadAction<null | number>) {
            state.vote_id = action.payload
        },
        setYourVoteId (state, action: PayloadAction<number | null>) {
            state.your_vote_id = action.payload
        }
    }
})
export const { setSelectedCandidateId, setVoteId, setError, setYourVoteId } = reactSlice.actions;

export default reactSlice.reducer;