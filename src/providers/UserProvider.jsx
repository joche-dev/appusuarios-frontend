import { createContext, useState } from 'react';

export const UserContext = createContext();

const URL_BASE = 'https://appusuarios-backend.onrender.com';

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = () => {
    setLoading(true);
    fetch(`${URL_BASE}/users`)
      .then((response) => response.json())
      .then(({ data }) => setUsers(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const addUser = async (user) => {
    const response = await fetch(`${URL_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    return data;
  };

  const updateUser = async (user) => {
    const response = await fetch(`${URL_BASE}/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    return data;
  };

  const deleteUser = async (id) => {
    const response = await fetch(`${URL_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    return data;
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        loading,
        error,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
