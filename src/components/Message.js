import React from 'react'
import axios from 'axios';
import Cookies from '../Cookies';
import swal from 'sweetalert';


const popup = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0, 0.5)'
  }

const popup_inner = {
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '25%',
    bottom: '25%',
    margin: 'auto',
    background: 'white'
  }

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            text: ''
        }

        this.submit = this.submit.bind(this);
        this.change = this.change.bind(this);
      }

      submit(e) {
        e.preventDefault();
    
        if(this.state.text !== '') {
          axios.post('http://localhost:3001/message', {
            host: this.props.host,
            renter: this.props.renter,
            text: this.state.text
          })
          this.setState({ text: '' });
          this.getMsg();
        }
      }
      change(e) {
        this.setState({ text : e.target.value });
      }

    render() {

        return (
            <div>
                <div style={popup}>
                    <div style={popup_inner}>
                            <input type='text' value={this.value} onChange={this.change} />
                            <button onClick={this.props.toggleShow} className="button button-outline">Cancel</button>
                            <button onClick={this.submit} >submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;