import { Component } from 'react';
import { AddContacts } from './AddContacts/AddContacts';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filterName: '',
  };

  createUser = (name, number) => {
    const newUser = {
      name,
      number,
      id: nanoid(),
    };
    for (const contact of this.state.contacts) {
      if (
        name.toLowerCase() === contact.name.toLowerCase() &&
        number === contact.number
      ) {
        return alert(name + ' is already in contact list');
      }
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newUser],
      filterName: prevState.filterName,
    }));
  };

  deleteUser = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
        filterName: prevState.filterName,
      };
    });
  };

  setFilter = filter => {
    this.setState(prevState => {
      return {
        filterName: filter,
        contacts: prevState.contacts,
      };
    });
  };

  render() {
    // console.log('this render:>> ', this);
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .startsWith(this.state.filterName.toLowerCase().trim())
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <AddContacts createUser={this.createUser} />
        <h2>Contacts</h2>
        <Filter setFilter={this.setFilter} />
        <ContactsList
          contacts={filteredContacts}
          deleteUser={this.deleteUser}
        />
      </div>
    );
  }
}
