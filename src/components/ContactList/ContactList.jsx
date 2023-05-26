import { PhonebookList, Loader } from './ContactList.styled';
import { ContactListItem } from 'components';
import {
    selectContacts,
    selectFilteredContacts,
    selectIsLoading,
    selectError,
} from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Filter, NoSavedContacts, NoFilteredContacts } from 'components';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export const ContactList = () => {
    const contacts = useSelector(selectContacts);
    const filteredContacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const showErrorToast = () => {
        toast.error("Oops... something went wrong. Let's try again.", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    return (
        <>
            {contacts.length > 0 && <Filter />}
            {isLoading && (
                <Loader>
                    <ThreeDots
                        height="60"
                        width="60"
                        radius="9"
                        color="#00af1a"
                        ariaLabel="three-dots-loading"
                    />
                </Loader>
            )}
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

            {error && showErrorToast()}
        </>
    );
};
