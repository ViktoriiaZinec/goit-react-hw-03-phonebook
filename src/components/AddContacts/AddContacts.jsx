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
  //componentDidMount() відпрацьовує один раз після рендеру
  componentDidMount() {
    //Отримуємо ключ ('contacts') до сховища
    const contacts = localStorage.getItem('contacts');
    // console.log('didMount');
    // console.log('contacts :>> ', contacts);
    //Якщо contacts існує, додаємо контакти в сховище. Якщо вони є,то використовуємо метод JSON.parse() для перетворення string даних (JSON) в об'єкт JavaScript , а потім встановлюємо  стан компоненту за допомогою методу setState(), щоб відобразити контакти в інтерфейсі.
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  //componentDidUpdate відпрацьовує щоразу після оновлення prevState (або prevProps якби вони були в даному випадку)
  //prevState.contacts - властивість contacts із попередього компонента.
  // this.state.contacts - стан компоненту на даний момент.
  // JSON.stringify(this.state.contacts) - перетворення об'єкту this.state.contacts в string JSON.
  // localStorage.setItem('contacts', JSON.stringify(this.state.contacts)) - збереження строки JSON в локальному сховищі браузера під ключом 'contacts'.
  // Таким чином, при кожній зміні стану компонента відбувається збереження його даних в localStorage.

  componentDidUpdate(_, prevState) {
    // console.log('did update');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createUser = (name, number) => {
    const newUser = {
      name,
      number,
      id: nanoid(),
    };
    const isExist = (name, number, contacts) => {
      return contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      );
    };

    if (isExist(name, number, this.state.contacts)) {
      return alert(name + ' is already in contact list');
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newUser],
    }));
  };

  deleteUser = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  setFilter = filter => {
    this.setState(() => {
      return {
        filterName: filter,
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
