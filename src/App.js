import React from 'react';
import './style.scss';
import AllUsers from './AllUsers.js';
import SingleUser from './SingleUser.js';
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      _id : '',
      users : []
    }
  }


  componentDidMount(){
    axios.get(`http://192.168.2.65:3030/posts`)
			.then(res => this.setState({ users: res.data.data }))
			.catch((err) => console.log("error"));
  }

  getUsers = () => {
    axios.get(`http://192.168.2.65:3030/posts`)
			.then(res => this.setState({ users: res.data.data }))
			.catch((err) => console.log(err));
  }

  findUser = (event) => {
    this.setState({
      _id: event.target.id,
      // show: true
    });
  }

  render(){
    const { users,_id } = this.state;
    return(
      <div className="flexContainer">
        <div className="users">
          <center><h2> User List </h2></center>
          <AllUsers users={users} getUsers={this.getUsers} findUser={this.findUser} />
        </div>
        <div className="singleUser">
          <center><h2> Profile </h2></center>
          <SingleUser _id={_id} getUsers={this.getUsers}/>
        </div>
      </div>
    );
  }
}

export default App;
