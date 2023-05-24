import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import { contactFormReducer } from './contactFormSlice';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filter: filterReducer,
        contactForm: contactFormReducer,
    },
});
