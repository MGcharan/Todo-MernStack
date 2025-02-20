// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // EditId
  const [editId, setEditId] = useState(null);

  // Edit
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const api_url = `${import.meta.env.VITE_BACKEND_URL}/api`;

  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      axios
        .post(
          api_url + "/todos",
          {
            title,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setTodos([...todos, res.data]); // Add newly created todo item
            setMessage("Item added successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setTitle("");
            setDescription("");
          } else {
            setError("Unable to create todo item");
          }
        })
        .catch((err) => {
          console.error("Axios error: ", err);
          setError("Unable to create todo item, Please try again later.");
        });
    } else {
      setError("Title and description cannot be empty");
    }
  };

  const getItem = async () => {
    try {
      const res = await axios.get(api_url + "/get-todo");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const handleEdit = (item) => {
    setEditId(item._id); // Correctly set editId
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = () => {
    if (editId && editTitle.trim() !== "" && editDescription.trim() !== "") {
      axios
        .put(
          `${api_url}/update/${editId}`,
          {
            title: editTitle,
            description: editDescription,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const updatedTodos = todos.map((todo) =>
              todo._id === editId
                ? { ...todo, title: editTitle, description: editDescription }
                : todo
            );
            setTodos(updatedTodos);
            setMessage("Item updated successfully");
            setEditTitle("");
            setEditDescription("");
            setEditId(null);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            setError("Unable to update todo item");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Unable to update todo item. Please try again later.");
        });
    } else {
      setError("Title and description cannot be empty");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(api_url + "/delete/" + id);
      const deleteTodo = todos.filter((item) => item._id !== id);
      setTodos(deleteTodo);
    }
  };

  return (
    <>
      <div className="row bg-success text-light p-3 px-5 d-flex">
        <h1 className="text-center">Todo App-MERN</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        <p className="text-success">{message}</p>
        <div className="form-group d-flex gap-3">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            value={title}
          />
          <input
            className="form-control"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            value={description}
          />
          <button className="btn btn-dark" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>

      <div className="d-flex row ms-1 mt-3">
        {todos.length === 0 ? (
          <h4 className="fw-bold text-center mt-5 pt-5">No todo data added</h4>
        ) : (
          <h1>Task</h1>
        )}

        <ul className="list-group">
          {todos.map((item) => (
            <li
              key={item._id} // Unique key prop
              className="list-group-item d-flex justify-content-between align-items-center bg-secondary rounded-4 my-2"
            >
              <div className="d-flex flex-column me-2">
                {editId === null || editId !== item._id ? (
                  <>
                    <span className="fw-bolder">{item.title}</span>
                    <span>{item.description}</span>
                  </>
                ) : (
                  <>
                    <div className="form-group d-flex gap-3">
                      <input
                        className="form-control col-lg-6"
                        type="text"
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        value={editTitle}
                      />
                      <input
                        className="form-control col-lg-6"
                        type="text"
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                        value={editDescription}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex gap-2">
                {editId === null || editId !== item._id ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-success text-info"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                )}
                {editId === null ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button className="btn btn-danger" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
