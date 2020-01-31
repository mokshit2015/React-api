import Modal from 'react-bootstrap/Modal';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class SingleUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: '',
			body: '',
			title: '',
			UpdatedBody: '',
			updatedTitle: '',
			show: false
		}
	}

	componentWillReceiveProps(props) {
		if ((this.props._id !== props._id)) {
			axios.get(`http://192.168.2.65:3030/posts/${props._id}`)
				.then(res => this.setState({
					_id: res.data._id,
					body: res.data.body,
					title: res.data.title,
					UpdatedBody: res.data.body,
					updatedTitle: res.data.title
				}))
				.catch((err) => console.log("error"));
		}
	}

	handleShow = () => {
		this.setState({
			show: true,
		});
	}

	handleClose = () => {
		this.setState({
			show: false
		});
	}

	dataUpdate = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	dataUpdateAPI = () => {
		const { UpdatedBody, updatedTitle } = this.state;
		const { _id } = this.props;
		axios.put(`http://192.168.2.65:3030/posts/${_id}`, {
			title: updatedTitle,
			body: UpdatedBody,
		})
			.then(res => {
				this.setState({
					show: false,
					title: updatedTitle,
					body: UpdatedBody

				})
			}).then(
				this.props.getUsers
			)

	}


	render() {
		const { _id, title, body, show, UpdatedBody, updatedTitle } = this.state;
		return (
			<>
				<div className="user-card">
					<h2> Title : {title} </h2>
					<h2> Body : {body} </h2>
					<h2> Id : {_id} </h2>
					<Button variant="outline-primary" className="small" onClick={this.handleShow}> <FontAwesomeIcon icon={faEdit} /> Edit </Button>
				</div>
				<Modal show={show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit User Data</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>

							<Form.Group as={Row} controlId="formPlaintextEmail">
								<Form.Label column sm="3">
									Title :
                    </Form.Label>
								<Col sm="9">
									<input type="text" name="updatedTitle" value={updatedTitle} className="form-control" onChange={this.dataUpdate} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} controlId="formPlaintextEmail">
								<Form.Label column sm="3">
									Body :
                    </Form.Label>
								<Col sm="9">
									<input type="text" name="UpdatedBody" value={UpdatedBody} className="form-control" onChange={this.dataUpdate} />
								</Col>
							</Form.Group>

						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="outline-danger" onClick={this.handleClose}>Cancel</Button>
						<Button variant="outline-success" onClick={this.dataUpdateAPI}>Submit</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default SingleUser;