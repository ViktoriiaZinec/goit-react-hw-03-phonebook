import css from './ContactsList.module.css';
import propTypes from 'prop-types';

export function ContactsList({ contacts, deleteUser }) {
  return (
    <div>
      <ul className={css.list}>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={css.btnDelete}
              onClick={event => {
                deleteUser(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ContactsList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  deleteUser: propTypes.func.isRequired,
};
