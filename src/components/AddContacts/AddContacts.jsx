import { Component } from 'react';
import css from './AddContacts.module.css';
import propTypes from 'prop-types';

export class AddContacts extends Component {
  state = {
    name: '',
    number: '',
  };

  //Виносимо функцію  з рендеру і робимо метод, щоб кожен раз не викликалася нова функція
  // Name повинен співпадати з полем в state(
  // якщо в state name: 'email', то і в input name='email'
  //
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  //name у квадратних дужках бо це значення динамічне і зберігає  змінну
  // Ідентичний запис з тим що нагорі, але потрібно
  // handleChange(event) {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value,
  //   });
  //   // Показує попередній стан, бо setState працює асинхронно
  //   console.log(this.state);
  // }

  handleSubmit = e => {
    e.preventDefault();
    // this.props.createUser(this.state);
    this.props.createUser(this.state.name, this.state.number);
    // Очищення форми після додавання контакту
    this.setState({
      name: '',
      number: '',
    });
  };
  //Контрольована форма - рендер залежить від state. Якщо захардкодити value='something', завжди буде something. Тому в value записуємо name зі state (value={this.state.name},value={this.state.number})
  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
            value={this.state.name}
          />
          <input
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={this.state.number}
          />
        </div>

        <button type="submit" className={css.btn_primary}>
          Add Contacts
        </button>
      </form>
    );
  }
}

AddContacts.propTypes = {
  createUser: propTypes.func.isRequired,
};
