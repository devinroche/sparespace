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
            <form onSubmit={this.handleFormSubmit}>
                <div>
                    <input
                        type="text"
                        ref={(node) => (this.input = node)}
                        placeholder="Enter your message…"
                    />
                </div>
                <div className="button-container">
                    <button type="submit">
                        Send
          </button>
                </div>
            </form>
        )
    }
}

export default Input