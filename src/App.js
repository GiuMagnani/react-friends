import React, {useState} from 'react';
import User from "./components/User";
import { Router, Link } from "@reach/router";
import Home from "./components/Home";
import { getRandomInteger } from "./utils";

const testUsers = [
  {
    id: 0,
    name: "John",
    friends: [],
  },
  {
    id: 1,
    name: "Paul",
    friends: [],
  },
  {
    id: 2,
    name: "Ringo",
    friends: [],
  },
  {
    id: 3,
    name: "George",
    friends: [],
  },
];

const App = () => {
  let saveFailed = false;
  const [users, setUsers] = useState(testUsers);
  const counter = 0;

  function createUpdateUser(userToSave) {
    const userFound = users.find(user => user.id === userToSave.id);
    const nameFound = users.find(user => user.name === userToSave.name);

    if (nameFound && nameFound.id !== userToSave.id) {
      return alert("That user already exists! Please choose another name.");
    }

    // try to update
    if (getRandomInteger(0, 10) > 6) {
      // success
      if (userFound) {
        setUsers(
          users.map(user => {
            if (user.id === userToSave.id) {
              return userToSave;
            }

            return user;
          })
        );
      } else {
        setUsers([...users, userToSave]);
      }
      saveFailed = false;
    } else {
      // failed
      if (saveFailed) {
        const userPrompt = window.confirm(
          "The save has failed failed, would you like to try again?"
        );
        // try again more times
        if (userPrompt) createUpdateUser(userToSave);
      } else {
        // try again first time
        saveFailed = true;
        createUpdateUser(userToSave);
      }
    }
  }

  return (
    <>
      <header className="header">
        <Link to="/">
          <span role="img" aria-labelledby="home">
            🏡
          </span>{" "}
          Home
        </Link>
      </header>
      <main>
        <Router>
          <User
            path="users/*"
            createUpdateUser={createUpdateUser}
            users={users}
            counter={counter}
          />
          <Home path="/" users={users} />
        </Router>
      </main>
      <footer>
        Developed by <a href="https://www.giumagnani.com" target="_blank" rel="noopener noreferrer">Giu Magnani</a>
      </footer>
    </>
  );
};

export default App;
