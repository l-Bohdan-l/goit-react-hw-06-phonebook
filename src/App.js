import './App.scss';
import React from 'react';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactsList } from './components/ContactList/ContactList';
import { Container } from './components/Container/Container';
import { nanoid } from 'nanoid';
import { Filter } from './components/Filter/Filter';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  filterContact,
} from './redux/contacts/contactsActions';
import * as storage from './services/localStorage';

function App() {
  const contacts = useSelector(state => state.phonebookReducers.contacts);
  const filter = useSelector(state => state.phonebookReducers.filter);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  console.log(filter);

  // const [contacts, setContacts] = useState([
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  // const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    const parsedStoragedContacts = JSON.parse(contactsFromStorage);
    if (parsedStoragedContacts) {
      dispatch(addContact(parsedStoragedContacts));
    }
  }, []);

  useEffect(() => {
    storage.save('contacts', contacts);
  }, [contacts]);

  const createContact = newContact => {
    // const contact = {
    //   id: nanoid(),
    //   name,
    //   number,
    // };
    const dublicateContact = contacts.some(checkedContact => {
      return checkedContact.name.toLowerCase() === name.toLowerCase();
    });

    if (dublicateContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
  };

  const deleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    dispatch(filterContact(value));
  };

  const getFilteredContacts = () => {
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div className="App">
      <header className="App-header">
        <Container title="Phonebook">
          <ContactForm createContact={createContact} />
        </Container>
        <Container title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <ContactsList
            contacts={filteredContacts}
            onDelete={deleteContact}
          ></ContactsList>
        </Container>
      </header>
    </div>
  );
}

export default App;
