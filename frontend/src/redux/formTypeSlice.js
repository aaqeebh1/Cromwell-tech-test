import { createSlice } from '@reduxjs/toolkit';

const formTypeSlice = createSlice({
    name: 'formType',
    initialState: {
        currentForm: 'register',
        formConfig: {
            login: {
                title: 'Login',
                fields: [
                    { name: 'email', type: 'email', placeholder: 'Email' },
                    { name: 'password', type: 'password', placeholder: 'Password' },
                ],
                buttonText: 'Login',
            },
            register: {
                title: 'Register',
                fields: [
                    { name: 'name', type: 'text', placeholder: 'Name' },
                    { name: 'email', type: 'email', placeholder: 'Email' },
                    { name: 'password', type: 'password', placeholder: 'Password' },
                    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
                ],
                buttonText: 'Register',
            },
        },
    },
    reducers: {
        setFormType: (state, action) => {
            state.currentForm = action.payload;
        },
    },
})

export const { setFormType } = formTypeSlice.actions;
export default formTypeSlice.reducer;