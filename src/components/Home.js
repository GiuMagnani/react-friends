import React from "react";
import { Link } from "@reach/router";
import UsersList from "./UsersList";

export default ({ users }) => {
  return (
    <section style={{ padding: "0 1rem" }}>
      <Link to="users/new" className="button">
        <span role="img" aria-labelledby="new user">
          🙋
        </span>New
      </Link>
      <UsersList path="/" users={users} />
    </section>
  );
};
