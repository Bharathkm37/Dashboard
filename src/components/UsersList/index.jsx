import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UsersList = () => {
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
      .then((data) => setUsers(data))
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
    <div>
      <h1 style={{textAlign:'center', marginBottom:'5px'}}>Users</h1>
      {selectedUser && selectedUser?.name && (
        <div className="popup">
          <div className="overlay"></div>
          <div className="popupBody">
            <p className='formGroup'>
              <div className='label'>Name</div>
              <input
                type="text"
                value={userData.name}
                onChange={(ev) =>
                  setUserData({ ...userData, name: ev.target.value })
                }
                
              />
            </p>
            <p className='formGroup'>
              <div className='label'>Email</div>
              <input
                type="text"
                value={userData.email}
                onChange={(ev) =>
                  setUserData({ ...userData, email: ev.target.value })
                }
              />
            </p>
            <p className='formGroup'>
              <div className='label'>Phone</div>
              <input
                type="text"
                value={userData.phone}
                onChange={(ev) =>
                  setUserData({ ...userData, phone: ev.target.value })
                }
              />
            </p>
            <p className='formGroup'>
              <div className='label'>Website</div>
              <input
                type="text"
                value={userData.website}
                onChange={(ev) =>
                  setUserData({ ...userData, website: ev.target.value })
                }
              />
            </p>
            <div className="popup-footer">
            <button onClick={onSave.bind(this, selectedUser.id)}>Update</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="basic-grid">
        {users &&
          users.map((user) => (
            <div className="card" key={user.id}>
              <div className="card-body">
                <div className="title">
                  <Link to={`/users/${user.id}`}>{user.name} </Link>
                </div>
                <div className="email">{user.email}</div>
                <div className="phone">{user.phone}</div>
                <div className="web">{user.website}</div>
              </div>

              <div className="row_group">
                
                <div className="item">
                  <button onClick={openPopup.bind(this, user.id)}>Edit</button>
                </div>
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default UsersList;
