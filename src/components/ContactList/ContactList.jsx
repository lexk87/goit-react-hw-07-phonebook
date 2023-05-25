import { PhonebookList, Loader } from './ContactList.styled';
import { ContactListItem } from 'components';
import {
    selectContacts,
    selectFilteredContacts,
    selectIsLoading,
} from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Filter, NoSavedContacts, NoFilteredContacts } from 'components';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const ContactList = () => {
    const contacts = useSelector(selectContacts);
    const filteredContacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <>
            {contacts.length > 0 && <Filter />}
            {/* {isLoading && (
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            )} */}
            <Loader>
                <ThreeDots
                    height="60"
                    width="60"
                    radius="9"
                    color="#00af1a"
                    ariaLabel="three-dots-loading"
                />
            </Loader>
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
