import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './style.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/query', { input });
      setOutput(response.data.response);
    } catch (error) {
      console.error('Error querying LLM:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Local LLM Interaction</h1>
        <textarea
          className='textbox'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text here"
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>
          <h2>Output:</h2>
          <p>{output}</p>
        </div>
      </header>
    </div>
  );
}


// class App extends React.Component {
//   constructor() {
//       super()
//       this.state = {
//           messages: []
//       }
//       this.sendMessage = this.sendMessage.bind(this)
//   } 
  
  
//   sendMessage(text) {
//       this.currentUser.sendMessage({
//           text
//       })
//   }
  
//   render() {
//       return (
//           <div className="app">
//             <Title />
//             <MessageList 
//                 messages={this.state.messages} />
//             <SendMessageForm
//                 sendMessage={this.sendMessage} />
//           </div>
//       );
//   }
// }

// class MessageList extends React.Component {
//   render() {
//       return (
//           <ul className="message-list">
//               {this.props.messages.map((message, index) => {
//                   return (
//                     <li  key={message.id} className="message">
//                       <div>{message.senderId}</div>
//                       <div>{message.text}</div>
//                     </li>
//                   )
//               })}
//           </ul>
//       )
//   }
// }

// class SendMessageForm extends React.Component {
//   constructor() {
//       super()
//       this.state = {
//           message: ''
//       }
//       this.handleChange = this.handleChange.bind(this)
//       this.handleSubmit = this.handleSubmit.bind(this)
//   }
  
//   handleChange(e) {
//       this.setState({
//           message: e.target.value
//       })
//   }
//   handleSubmit = async () => {
//     var input = this.state.message;
//     try {

//       const response = await axios.post('http://127.0.0.1:5000/api/query', { input });
//       const setOutput = response.data.response;
//       this.setState({
//           message: ''
//       })
//     } catch (error) {
//       console.error('Error querying LLM:', error);
//     }
//   } 
//   // handleSubmit(e) {
//   //     e.preventDefault()
//   //     this.props.sendMessage(this.state.message)
//   //     this.setState({
//   //         message: ''
//   //     })
//   // }
  
//   render() {
//       return (
//           <form
//               onSubmit={this.handleSubmit}
//               className="send-message-form">
//               <input
//                   onChange={this.handleChange}
//                   value={this.state.message}
//                   placeholder="Type your question here"
//                   type="text" />
//           </form>
//       )
//   }
// }

// function Title() {
//   return <p className="title">LLM MVP DEMO</p>
// }

export default App;