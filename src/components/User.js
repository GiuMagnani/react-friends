import React, { useState } from "react";
import { navigate } from "@reach/router";
import Friends from "./Friends";
import { slugify } from "../utils";

const User = ({ location, users, isModal, counter, createUpdateUser }) => {
  // get user from pathname
  let myPathname = location.pathname.replace("/users/", "").split("/");
  const userFound = users.find(
    user => slugify(user.name) === myPathname[counter]
  );
  let isUserNew = userFound === undefined || myPathname[counter] === "new";
  // check if new or exists
  const user = isUserNew
    ? {
        name: "",
        id: users.length,
        friends: [],
      }
    : userFound;

  const [editedUser, setEditedUser] = useState(user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function isEqual() {
    return JSON.stringify(editedUser) === JSON.stringify(user);
  }

  function handleSaveUser() {
    createUpdateUser(editedUser);
    if (isModal) {
      let newPathname = location.pathname.split("/");
      newPathname[newPathname.length - 1] = slugify(editedUser.name);
      newPathname = newPathname.join("/");
      navigate(newPathname);
    } else {
      navigate(`${slugify(editedUser.name)}`);
    }
  }

  function handleClickOnFrame() {
    if (isModalVisible) {
      const userPrompt = window.confirm("Do you want to abort the operation?");
      if (userPrompt) {
        let newPathname = location.pathname.split("/");
        newPathname.splice(newPathname.length - 1, 1);
        newPathname = newPathname.join("/");
        navigate(newPathname);
        setIsModalVisible(false);
      }
    }
  }

  function handleNewFriend() {
    setIsModalVisible(true);
    navigate(`${location.pathname}/new`);
  }

  return (
    <div
      className={`user-page ${isModalVisible ? "is-modal-visible" : ""} ${
        isModal ? "is-modal" : ""
      }`}>
      <div className="mask" onClick={() => handleClickOnFrame()} />
      <h2>{isUserNew ? "New User" : editedUser.name}</h2>
      <label htmlFor={`name-${counter}`}>Name</label>
      <br />
      <input
        id={`name-${counter}`}
        name={`name-${counter}`}
        value={editedUser.name}
        onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
      />
      <Friends
        users={users}
        user={user}
        setEditedUser={setEditedUser}
        editedUser={editedUser}
        handleNewFriend={handleNewFriend}
      />
      {isModalVisible && (
        <User
          users={users}
          isModal={true}
          counter={counter + 1}
          location={location}
          createUpdateUser={createUpdateUser}
        />
      )}

      <button onClick={handleSaveUser} disabled={isEqual()} className="button">
        {isUserNew ? "Add user" : "Save user"}
      </button>
    </div>
  );
};

export default User;
