import AddContactWrapper from "./components/AddContactWrapper";
import './App.css';
import api from './api/contacts'; // axios setup
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Fixed import
import { useState } from "react";
import { useEffect } from "react";
import ContactDetails from "./components/ContactDetails"
import Header from "./components/Header"
import ContactList from "./components/ContactList"
import { v4 as uuidv4 } from 'uuid';
import EditContactWrapper from "./components/EditContactWrapper"; // Import

function App() {
  const [contacts, setContacts] = useState([]);
  //const [isLoaded, setIsLoaded] = useState(false); //
  //  Track if data is loaded

  const getContacts = async () => {
    const response = await api.get('/contacts');
    return (response.data); // updates UI
  };

  const addContactHandler = async (contact) => {
    const request = {
      ...contact,
      id: uuidv4() // Truly unique ID
    };

    const response= await api.post("/contacts", request)
    console.log("Adding contact:", response);
    setContacts([...contacts, request]); // Correct immutable update
  };

const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact);
  setContacts(contacts.map((contact) =>
    contact.id === response.data.id ? response.data : contact
  ));
};


  // Load contacts - runs ONLY on mount
  useEffect(() => {
    const getAllContacts= async () =>{
      const allContacts= await getContacts();
      if (allContacts) setContacts(allContacts);
    };
   //const storedContacts = localStorage.getItem("contacts");
    //if (storedContacts && storedContacts !== "undefined") {
      //try {
        //const parsedContacts = JSON.parse(storedContacts);
        //console.log("Loaded contacts from localStorage:", parsedContacts);
        //setContacts(parsedContacts);
      //} catch (e) {
        //console.error("Failed to parse contacts:", e);
      //}
    //} else {
      //console.log("No contacts found in localStorage or value is undefined");
    //}
    //setIsLoaded(true); // Mark as loaded
    getAllContacts();
  }, []); // Empty dependency array - runs only on mount

  // Save contacts - runs only AFTER initial load is complete
  //useEffect(() => {
    //if (isLoaded) { // Only save after we've loaded from localStorage
      //console.log("Saving to localStorage:", contacts);
      //localStorage.setItem('contacts', JSON.stringify(contacts)
      // );
    //}
  //}, [contacts, isLoaded]);

  useEffect(()=>{

  },[contacts]);

  const deleteContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="ui container">
      <Router>
        <Header/>
        
        <Routes> {/* Changed from Switch to Routes */}
          <Route 
            path="/add" 
            element={<AddContactWrapper addContactHandler={addContactHandler} />} 
          />
          <Route 
            path="/edit" 
            element={
              <EditContactWrapper updateContactHandler={updateContactHandler} />
            } 
          />
          <Route 
            path="/" 
            element={
              <ContactList 
                contacts={contacts} 
                deleteContactHandler={deleteContactHandler} 
              />
            } 
          />
          <Route path="/contact/:id" element={<ContactDetails/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;