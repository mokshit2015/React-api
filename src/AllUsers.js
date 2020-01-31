import Modal from 'react-bootstrap/Modal';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AllUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			addFlag: false,
			deleteUserId: '',
			deleteUserTitle: '',
			addTitle: '',
			addUserId: '',
			addBody: ''
		}
	}

	deleteUser = () => {
		axios.delete(`http://192.168.2.65:3030/posts/${this.state.deleteUserId}`)
			.then(this.newArray)
			.then(this.setState({ show: false }))
			.then(this.props.getUsers)
			.then(this.props.userDeletedFlag)
			.catch((err) => console.log("error"));
	}

	addUser = () => {
		const { addBody, addTitle, addUserId } = this.state;
		const { _id } = this.props;
		axios.post(`http://192.168.2.65:3030/posts/`, {
			title: addTitle,
			body: addBody,
			userId: addUserId,
		}).then(res => {
			this.setState({
				addTitle: '',
				addBody: '',
				userId: '',
				addFlag: false
			})
		}).then(this.props.getUsers)
	}

	handleShow = (_id, title) => this.setState({
		show: true,
		deleteUserId: _id,
		deleteUserTitle: title
	});

	handleClose = () => this.setState({
		show: false,
		deleteUserId: ''
	});

	handleAdd = () => this.setState({ addFlag: true });

	handleAddClose = () => this.setState({ addFlag: false });

	dataUpdate = (event) => this.setState({ [event.target.name]: event.target.value });

	render() {
		const { users, findUser } = this.props;
		const { show, deleteUserTitle, addFlag, addBody, addTitle, addUserId } = this.state;
		return (
			<>
				<div>
					<Button variant="outline-primary" className="btn-add" onClick={this.handleAdd}> <FontAwesomeIcon icon={faUserAlt} /><b> Add User </b></Button>
					{
						users.map((data, i) => {
							return <div className="name" key={i}>
								<Button variant="outline-primary" className="big" id={data._id} onClick={findUser}>{data.title}</Button>
								<Button variant="outline-danger" className="small" onClick={() => this.handleShow(data._id, data.title)}> <FontAwesomeIcon icon={faTrashAlt} /> </Button>
							</div>
						})
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
				<Modal show={addFlag} onHide={this.handleAddClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add User Data</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group as={Row} controlId="formPlaintextEmail">
								<Form.Label column sm="3">Title :</Form.Label>
								<Col sm="9">
									<input type="text" name="addTitle" value={addTitle} className="form-control" onChange={this.dataUpdate} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} controlId="formPlaintextEmail">
								<Form.Label column sm="3"> Body : </Form.Label>
								<Col sm="9">
									<input type="text" name="addBody" value={addBody} className="form-control" onChange={this.dataUpdate} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} controlId="formPlaintextEmail">
								<Form.Label column sm="3"> User Id :</Form.Label>
								<Col sm="9">
									<input type="text" name="addUserId" value={addUserId} className="form-control" onChange={this.dataUpdate} />
								</Col>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="outline-danger" onClick={this.handleAddClose}>Cancel</Button>
						<Button variant="outline-success" onClick={this.addUser}>Submit</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default AllUsers;
