import React, { useState } from "react";

const Friends = ({
  user,
  users,
  setEditedUser,
  editedUser,
  handleNewFriend,
}) => {
  const [selectedFriend, setSelectedFriend] = useState("");
  let availableFriends = users.filter(x => {
    return editedUser.friends.indexOf(x) === -1 && user.id !== x.id;
  });

  function addFriend() {
    if (!selectedFriend) return;
    const alreadyFriend = editedUser.friends.some(
      x => x.id === Number(selectedFriend)
    );
    if (alreadyFriend) return;

    const newFriend = users.find(x => x.id === Number(selectedFriend));
    setEditedUser({
      ...editedUser,
      friends: [...editedUser.friends, newFriend],
    });
    setSelectedFriend("");
  }

  function removeFriend({ id }) {
    setEditedUser({
      ...editedUser,
      friends: editedUser.friends.filter(x => x.id !== id),
    });
    setSelectedFriend("");
  }

  return (
    <>
      <h3>Friends</h3>
      <div style={friendsButtons}>
        <select
          onChange={e => setSelectedFriend(e.target.value)}
          value={selectedFriend}>
          <option value="">Select</option>
          {availableFriends.map((user, index) => (
            <option key={index} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={() => addFriend()} disabled={selectedFriend === ""}>Add friend</button>
        <button onClick={() => handleNewFriend()}>New friend</button>
      </div>
      <ul>
        {editedUser.friends.map((friend, index) => (
          <li key={index} style={friendStyle}>
            {friend.name}
            <button onClick={() => removeFriend(friend)}>Remove friend</button>
          </li>
        ))}
      </ul>
    </>
  );
};

const friendStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",
  width: "320px",
};

const friendsButtons = {
  display: "flex",
  justifyContent: "space-between",
  width: "320px",
};

export default Friends;
