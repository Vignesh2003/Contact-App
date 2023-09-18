import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts'; // Update with your backend URL
const COUNTRY_API_URL = 'https://restcountries.com/v3.1/all';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    username: '',
    email_id: '',
    phone_number: '',
    country: '',
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setContacts(response.data);
    });

    axios.get(COUNTRY_API_URL).then((response) => {
      const countryNames = response.data.map((country) => country.name.common);
      setCountries(countryNames);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    axios.post(API_URL, newContact).then((response) => {
      setContacts([...contacts, response.data]);
      setNewContact({
        name: '',
        username: '',
        email_id: '',
        phone_number: '',
        country: '',
      });
    });
  };

  return (

    
    <div className="grid h-screen place-items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <h1 className="text-3xl font-semibold mb-5">Contact Manager</h1>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-3">Add Contact</h2>
        <form>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newContact.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newContact.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email_id"
              placeholder="Email"
              value={newContact.email_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              value={newContact.phone_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <select
              name="country"
              value={newContact.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddContact}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Contact
          </button>
        </form>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-3">Contact List</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.name} - {contact.username} - {contact.email_id} -{' '}
              {contact.phone_number} - {contact.country}
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default App;
