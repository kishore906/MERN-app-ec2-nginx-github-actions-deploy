import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/getUsers/${id}`)
      .then((response) => {
        //console.log(response);
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();

    axios
      .put(`/api/updateUser/${id}`, { name, email, age })
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setAge("");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
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

          <button className="btn btn-success my-3">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
