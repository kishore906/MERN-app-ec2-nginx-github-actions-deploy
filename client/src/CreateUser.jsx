import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/createUser", { name, email, password, age })
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add New User</h2>
          <div className="mb-2">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter Name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">
              <b>EmailId</b>
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter EmailId.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="age">
              <b>Age</b>
            </label>
            <input
              type="text"
              id="age"
              className="form-control"
              placeholder="Enter Age.."
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button className="btn btn-success my-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
