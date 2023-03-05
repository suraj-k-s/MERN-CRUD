import React, { Component } from "react";
import axios from "axios";

export default class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: [],
      button: "",
      id:""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/user`).then((res) => {
      this.setState({ data: res.data });
      document.getElementById("formData").reset();
      this.setState({name:""})
    });
  }

  deleteData = (e) => {
    axios.delete(`http://localhost:3001/user/${e}`).then((res) => {
      this.componentDidMount();
    });
  };
  updateData = (e) => {
    this.setState({ name: e.name, button: "update" ,id:e._id});
  };

  formHandler = (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
    };

    if (this.state.button === "update") {
        axios
        .patch(`http://localhost:3001/user/${this.state.id}`, user)
        .then(this.componentDidMount());
    } else {
      axios
        .post(`http://localhost:3001/user`, user)
        .then(this.componentDidMount());
    }
  };

  render() {
    return (
      <div className="App" align="center">
        <h1>Names</h1>
        <form onSubmit={this.formHandler} method="POST" id="formData">
          <table border="1" style={{ borderCollapse: "collapse" }} width="250">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    defaultValue={this.state.name}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  <input type="submit" name="btnSave" value="Submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <br />
        <br />
        <br />
        <table border="1" style={{ borderCollapse: "collapse" }} width="250">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((name, id) => (
              <tr key={id + 1}>
                <th>{id + 1}</th>
                <th>{name.name}</th>
                <th>
                  <button onClick={() => this.deleteData(name._id)}>
                    Delete
                  </button>
                  |<button onClick={() => this.updateData(name)}>Update</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
