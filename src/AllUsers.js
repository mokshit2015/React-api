import Modal from 'react-bootstrap/Modal';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class AllUsers extends React.Component {
    constructor(props){
        super(props);
    }

    deleteUser = () => {
		axios.delete(`https://reqres.in/api/users/${this.state.delete_id}`)
			.then(this.newArray)
			.then(this.setState({ show: false }))
			.catch((err) => console.log("error"));
	}
    
    render(){
        const { users,findUser } = this.props;
        return(
            <div>
                {
					 
                     users.map((data, i) => {
                         return <div className="name" key={i}>
                             <Button  variant="outline-primary" className="big" id={data._id} onClick={findUser}>{data.title}</Button>
                             <Button  variant="outline-danger" className="small" onClick={() => this.handleShow(data._id, data.title)}> <FontAwesomeIcon icon={faTrashAlt} /> </Button>
                         </div>
                     }
                     )
 
                 }
            </div>
        );
    }
}

export default AllUsers;
