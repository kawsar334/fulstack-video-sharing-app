
import { createSlice } from '@reduxjs/toolkit'

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: null,
        loading: false,
        error: false
    },
    reducers: {
        fetchVideoStart: state => {
            state.currentVideo = null
            state.loading = true
            state.error = false
        },
        fetchVideoSuccess: (state, action) => {
            state.currentVideo = action.payload
            state.loading = false
            state.error = false

        },
        fetchVideoFailure: (state, action) => {
            state.currentVideo = null
            state.error = action.payload
            state.loading = false

        }
    }
});

export const { fetchVideoStart, fetchVideoSuccess, fetchVideoFailure } = videoSlice.actions

export default videoSlice.reducer