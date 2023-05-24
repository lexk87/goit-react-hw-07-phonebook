import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contactsList;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter.value;
export const selectContactForm = state => state.contactForm.isFormOpened;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
);
