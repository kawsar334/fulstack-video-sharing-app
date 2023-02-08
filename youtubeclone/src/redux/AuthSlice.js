
    import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser:null,
        loading:false,
        error:false
    },
    reducers: {
        loginStart: state => {
                state.currentUser=null
                state.loading=true 
                state.error=false
        },
        loginSuccess:( state, action )=> {
            state.currentUser = action.payload
            state.loading=false
             state.error =false
            
        },
        loginFailure: (state, action) => {
            state.currentUser=null
            state.error=action.payload
            state.loading=false
            
        }
    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions

export default userSlice.reducer