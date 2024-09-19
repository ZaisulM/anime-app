import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const UserList = () => {
  const [users, serUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        serUsers(response.data); // Set the data to state
      })
      .catch((error) => {
        console.error("Error fetching the users:", error); // Handle any error
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
