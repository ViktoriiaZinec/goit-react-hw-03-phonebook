import { Component, useState } from 'react';
import css from './AddContacts.module.css';
import propTypes from 'prop-types';

export const AddContacts = createUser => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = target => {
    setName(target.value);
    setNumber(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createUser(name, number);
    setName(name(''));
    setNumber(number(''));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.form_name}>
        <label htmlFor="input1" className={css.form_label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
        <input
          type="tel"
          name="number"
          placeholder="Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </div>

      <button type="submit" className={css.btn_primary}>
        Add Contacts
      </button>
    </form>
  );
};
