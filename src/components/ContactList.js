import React from 'react';
import ContactCard from './ContactCard';
import {Link} from 'react-router-dom'
const ContactList = (props) => {
    const renderContactList = props.contacts.map((contact) => {
      return (
        <ContactCard  
        key={contact.id} 
        deleteContactHandler={props.deleteContactHandler} 
        contact={contact}></ContactCard>
      );
    });
  
    return (
      <div class="main">
        <h2> Contact List
          <Link to='/add'> 
            <button className="ui button blue right">Add Contact</button> 
          </Link>
        </h2>
        <div className="ui celled list">
          {renderContactList}
        </div>
      </div>

    );
  };
  export default ContactList
  