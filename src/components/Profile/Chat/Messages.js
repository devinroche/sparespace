import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Messages extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        messages: [],
    }
    render() {
        return (
            <div>
                {this.props.messages.map((message, i) => (
                    <div>
                        {message.author && (
                            <span className="author">{message.author.first}:{message.text}</span>
                        )}
                        {message.body}
                    </div>
                ))}
            </div>
        )
    }
}

export default Messages