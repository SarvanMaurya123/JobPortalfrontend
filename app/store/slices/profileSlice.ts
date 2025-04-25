import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileState {
    id: number | null
    user_id: number | null
    full_name: string
    email: string
    phone_number: string
    location: string
    interested_area: string
    about: string
    date_of_birth: string
    resume_link: string
}

const initialState: ProfileState = {
    id: null,
    user_id: null,
    full_name: '',
    email: '',
    phone_number: '',
    location: '',
    interested_area: '',
    about: '',
    date_of_birth: '',
    resume_link: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            return { ...state, ...action.payload }
        },
        clearProfile: () => initialState,
    },
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer
