import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SingleUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          if (item.id == userId) {
            setUser(item);
          }
        });
      })
      .catch((er) => console.log(er));
  }, []);
  return (
    <div>
      <Link to="/">Back To Users</Link>
      <table border="1">
      
        <tr>
          <td>Name</td>
          <td>{user.name}</td>
        </tr>
        <tr>
          <td>Website</td>
          <td>{user.website}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{user.phone}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{user.email}</td>
        </tr>
        <tr>
          <td>Company</td>
          <td>
            {user?.company?.name},{user?.company?.catchPhrase},
            {user?.company?.bs}
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            {user?.address?.street},{user?.address?.city},{' '}
            {user?.address?.suite}, {user?.address?.zipcode}
          </td>
        </tr>
      </table>
    </div>
  );
};
export default SingleUser;
