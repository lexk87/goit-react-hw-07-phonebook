import { PhonebookList } from './ContactList.styled';
import { ContactListItem } from 'components';
import { selectContacts, selectFilteredContacts } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { Filter, NoSavedContacts, NoFilteredContacts } from 'components';

export const ContactList = () => {
    const contacts = useSelector(selectContacts);
    const filteredContacts = useSelector(selectFilteredContacts);

    return (
        <>
            {contacts.length > 0 && <Filter />}
            {!contacts.length && <NoSavedContacts />}
            {contacts.length > 0 && !filteredContacts.length && (
                <NoFilteredContacts />
            )}

            {filteredContacts.length > 0 && (
                <PhonebookList>
                    {filteredContacts.map(({ id, name, number }) => (
                        <ContactListItem
                            key={id}
                            id={id}
                            name={name}
                            number={number}
                        />
                    ))}
                </PhonebookList>
            )}
        </>
    );
};
