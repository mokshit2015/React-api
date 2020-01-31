import Modal from 'react-bootstrap/Modal';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class AllUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			deleteUserId: '',
			deleteUserTitle: ''
		}
	}

	deleteUser = () => {
		axios.delete(`http://192.168.2.65:3030/posts/${this.state.deleteUserId}`)
			.then(this.newArray)
			.then(this.setState({ show: false }))
			.then(this.props.getUsers)
			.catch((err) => console.log("error"));
	}

	handleShow = (_id, title) => {
		this.setState({
			show: true,
			deleteUserId: _id,
			deleteUserTitle: title
		});
	}

	handleClose = () => {
		this.setState({
			show: false,
			deleteUserId: ''
		});
	}

	render() {
		const { users, findUser } = this.props;
		const { show, deleteUserTitle } = this.state;
		return (
			<>
				<div>
					{

						users.map((data, i) => {
							return <div className="name" key={i}>
								<Button variant="outline-primary" className="big" id={data._id} onClick={findUser}>{data.title}</Button>
								<Button variant="outline-danger" className="small" onClick={() => this.handleShow(data._id, data.title)}> <FontAwesomeIcon icon={faTrashAlt} /> </Button>
							</div>
						}
						)

					}
				</div>
				<Modal show={show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Do You Want to Delete?</Modal.Title>
					</Modal.Header>
					<Modal.Body>User : {deleteUserTitle}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>	No </Button>
						<Button variant="danger" onClick={this.deleteUser}>Yes</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default AllUsers;
