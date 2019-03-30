import React from "react";
import { Link } from "@reach/router";
import {slugify} from "../utils";

const UsersList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users &&
        users.length > 0 &&
        users.map((user, index) => (
          <Link
            key={index}
            to={`users/${slugify(user.name)}`}
            style={{ display: "block" }}>
            {index + 1}. {user.name} →
          </Link>
        ))}
    </div>
  );
};

export default UsersList;
