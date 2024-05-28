import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Users:</h3>
      <ul className="border border-gray-300 rounded-md divide-y divide-gray-300">
        {users.map((user) => (
          <li
            key={user.id}
            className="px-4 py-2 flex justify-between items-center"
          >
            <span>{user.name}</span>
            <span className="text-gray-500">({user.email})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
