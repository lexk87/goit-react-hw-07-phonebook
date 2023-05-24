import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const extraActions = [fetchContacts, addContact, deleteContact];

const getExtraActions = type =>
    isAnyOf(...extraActions.map(action => action[type]));

const handleFetchContacts = (state, action) => {
    state.contactsList = action.payload;
};

const handleAddContact = (state, action) => {
    state.contactsList.unshift(action.payload);
};

const handleDeleteContact = (state, action) => {
    state.contactsList = state.contactsList.filter(
        ({ id }) => id !== action.payload
    );
};

const handleFulfilledMatcher = state => {
    state.isLoading = false;
    state.error = null;
};

const handlePendingMatcher = state => {
    state.isLoading = true;
};

const handleRejectedMatcher = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const contactsSlice = createSlice({
    name: 'contscts',
    initialState: { contactsList: [], isLoading: false, error: null },
    extraReducers: builder =>
        builder
            .addCase(fetchContacts.fulfilled, handleFetchContacts)
            .addCase(addContact.fulfilled, handleAddContact)
            .addCase(deleteContact.fulfilled, handleDeleteContact)
            .addMatcher(getExtraActions('fulfilled'), handleFulfilledMatcher)
            .addMatcher(getExtraActions('pending'), handlePendingMatcher)
            .addMatcher(getExtraActions('rejected'), handleRejectedMatcher),
});

export const contactsReducer = contactsSlice.reducer;
