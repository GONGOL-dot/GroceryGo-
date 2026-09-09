import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://grocerygo-ecom.onrender.com//users"
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://grocerygo-ecom.onrender.com//users/${id}`
      );

      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-users">

      <h1>Manage Users</h1>
      <p>View and manage registered customers.</p>

      <div className="users-table">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>

                <td>{user.id}</td>

                <td>
                  {user.name || "User"}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role || "Customer"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="remove-user"
                  >
                    Remove
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;