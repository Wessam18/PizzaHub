// UserAPI.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox } from 'react-icons/md';
import SearchBar from './tools/SearchBar';
import Spinner from './tools/Spinner';

const UserAPI = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(user => {
      const name = user.name ? user.name.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      const phoneNumber = user.phoneNumber ? user.phoneNumber : '';
      return (
        name.includes(value) ||
        email.includes(value) ||
        phoneNumber.includes(value)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center">
        <h2 className="title text-3xl my-6">User List</h2>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2 my-11">
          <thead>
            <tr>
              <th className="border border-gray-500 rounded-md">User Num</th>
              <th className="border border-gray-500 rounded-md">User Name</th>
              <th className="border border-gray-500 rounded-md">User Email</th>
              <th className="border border-gray-500 rounded-md">User Phone Number</th>
              <th className="border border-gray-500 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="h-8">
                  <td className="border border-gray-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-700 rounded-md text-center">
                    {user.name}
                  </td>
                  <td className="border border-gray-700 rounded-md text-center">
                    {user.email}
                  </td>
                  <td className="border border-gray-700 rounded-md text-center">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/users/details/${user._id}`}>
                        <BsInfoCircle className="text-2xl text-orange-800" />
                      </Link>
                      <Link to={`/users/delete/${user._id}`}>
                        <AiOutlineDelete className="text-2xl text-red-700" />
                      </Link>
                      <Link to={`/users/edit/${user._id}`}>
                        <AiOutlineDelete className="text-2xl text-red-700" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAPI;
