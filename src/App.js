import './App.scss';
import React from 'react';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactsList } from './components/ContactList/ContactList';
import { Container } from './components/Container/Container';
import { nanoid } from 'nanoid';
import { Filter } from './components/Filter/Filter';
import { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    const parsedStoragedContacts = JSON.parse(contactsFromStorage);
    if (parsedStoragedContacts) {
      setContacts(parsedStoragedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const dublicateContact = contacts.some(checkedContact => {
      return checkedContact.name.toLowerCase() === name.toLowerCase();
    });

    if (dublicateContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseFilter),
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div className="App">
      <header className="App-header">
        <Container title="Phonebook">
          <ContactForm onSubmit={createContact} />
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
