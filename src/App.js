import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './style.css';

import SingleUser from './components/SingleUser';
import UsersList from './components/UsersList';
import Dashboard from './components/Dashboard';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((er) => console.log(er));
  }, []);

  const openPopup = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    setSelectedUser(selectedUser);
    setUserData({
      name: selectedUser.name,
      email: selectedUser.email,
      phone: selectedUser.phone,
      website: selectedUser.website,
    });
  };

  const onCancel = () => {
    setSelectedUser([]);
  };

  const onSave = (id) => {
    const updateUser = [...users];
    const newUpdatedArray = [];
    updateUser.map((item) => {
      if (item.id === id) {
        newUpdatedArray.push({
          ...item,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          website: userData.website,
        });
      } else {
        newUpdatedArray.push(item);
      }
      return newUpdatedArray;
    });
    setUsers(newUpdatedArray);
  };

  return (
    <div className="container">
      <Switch>
        <Route path="/users/:userId" exact>
          <SingleUser />
        </Route>
        <Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/" exact>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}
