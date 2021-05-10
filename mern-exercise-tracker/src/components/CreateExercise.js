import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: []
		};
	}

	handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		};

		console.log(exercise);

		axios
			.post('http://localhost:8000/exercises/add', exercise)
			.then((res) => console.log(res.data))
			.catch((err) => console.log('Error' + err));

		// window.location = '/';
	};

	componentDidMount() {
		axios.get('http://localhost:8000/users/').then((res) => {
			if (res.data.length > 0) {
				this.setState({
					users: res.data.map((usr) => usr.username),
					username: res.data[0].username
				});
			}
		});
	}

	render() {
		return (
			<div>
				<h3>Create Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Username: </label>
						<select
							ref='userInput'
							className='form-control'
							value={this.state.username}
							onChange={this.handleChange}
							name='username'
						>
							{this.state.users.map(function(user) {
								return (
									<option key={user} value={user} name={user}>
										{user}
									</option>
								);
							})}
						</select>
					</div>
					<div className='form-group'>
						<label>Description: </label>
						<input
							type='text'
							required
							className='form-control'
							name='description'
							value={this.state.description}
							onChange={this.handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>Duration (in minutes): </label>
						<input
							type='text'
							className='form-control'
							name='duration'
							value={this.state.duration}
							onChange={this.handleChange}
						/>
					</div>
					<div className='form-group'>
						<label>Date: </label>
						<DatePicker selected={this.state.date} onChange={this.handleChange} />
					</div>
					

					<div className='form-group'>
						<input type='submit' value='Create Exercise Log' className='btn btn-primary' />
					</div>
				</form>
			</div>
		);
	}
}
