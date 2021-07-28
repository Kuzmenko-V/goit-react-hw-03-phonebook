import React, { Component} from 'react';
import './App.css';
import Section from './Components/Section';
import Form from './Components/Form';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';
import shortid from 'shortid'
class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) { this.setState({contacts: parsedContacts});}
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }; 

  formSabmitData = ({ name, number }) => {
    const temp = {
      id: `id-${shortid.generate()}`,
      name,
      number
    };
    if (this.state.contacts.filter(e => e.name === temp.name).length === 0) {
      this.setState(prevState => ({ contacts: [...prevState.contacts, temp], }));
    }
    else {
      alert(`${name} уже существует в контактах!`);
    }
  };
  
  inputChange = e => {
      const { name, value } = e.currentTarget;
      this.setState({ [name]: value});
  };

  filterContacts = name => {
   return this.state.contacts.filter(e => e.name.toLowerCase().includes(name.toLowerCase()) );
    
  };

  deleteContact = id => {
    this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== id),}));
  };
  
  render() {
    return (
      <div className="App">
        <Section title="Телефонная книга">
          <Form onSubmit={this.formSabmitData}/>
        </Section>
        <Section title="Контакты">
          <Filter filter={this.state.filter} inputChange={this.inputChange}/>
          <ContactList contacts={this.filterContacts(this.state.filter)} onDeleteContact={this.deleteContact}/>
        </Section>
      </div>
    );
   }
}

export default App;
