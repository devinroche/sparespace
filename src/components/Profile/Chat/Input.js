import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    static propTypes = {
        onMessageSend: PropTypes.func.isRequired,
    }

    componentDidMount = () => {
        this.input.focus()
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        this.props.onMessageSend(this.input.value)
        this.input.value = ""
    }

    render() {
        return (
            <div className='row chatForm'>
                <form onSubmit={this.handleFormSubmit}>
                    <div className='col-sm-10'>
                        <input
                            type="text"
                            ref={(node) => (this.input = node)}
                            placeholder="Enter your message…"
                            />
                    </div>
                    <div className="col-sm-2">
                        <button type="submit" style={btnStyle} className="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Input

const btnStyle = {
    fontFamily: "Rubik",
    color: "#FFF",
    fontWeight: "400",
    width: 100,
    height: 40,
    fontSize: 20,
    background: "linear-gradient(to right, #FE947B, #FC5B45)",
    border: "none"
};