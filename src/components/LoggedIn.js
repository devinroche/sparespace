import React from "react"
import axios from "axios"

class LoggedIn extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	componentDidMount() {
		axios
			.get(`http://localhost:3001/user/${this.props.match.params.id}`)
			.then(res => this.setState({ user: res.data }))
			.catch(err => console.log("some err occured", err))
	}

	render() {
		console.log("some proppppppps", this.props)
		const user = this.state.user ? this.state.user : ""

		return (
			<div className="text-center" style={{ marginTop: 100 }}>
				<h1>Welcome {user.fullname}</h1>
			</div>
		)
	}
}

export default LoggedIn
