import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contscts',
    initialState: { contactsList: [], isLoading: false, error: null },
    reducers: {
        addContact(state, action) {
            state.contactsList.unshift(action.payload);
        },
        deleteContact(state, action) {
            state.contactsList = state.contactsList.filter(
                ({ id }) => id !== action.payload
            );
        },
    },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
