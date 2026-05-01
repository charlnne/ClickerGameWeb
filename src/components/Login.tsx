import React, { useState } from 'react';
import { createUser, loginUser } from '../apis/userCRUD';

interface LoginProps {
  onLogin: (username: string, points: number, clickPower: number) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username) {
      alert("Username cannot be empty");
      return;
    }

    try {
      const response = await createUser(username);
      if (response.status === 201) { 
        alert("Account created successfully! You can now log in.");
      } else {
        alert("An error occurred during registration");
      }
    } catch (error: any) {
      console.error("Error response:", error.response ? error.response : error);
      alert("Failed to connect to the server");
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username) {
      alert("Username cannot be empty");
      return;
    }

    try {
      const response = await loginUser(username);
      const data = response.data;

      if (response.status === 200) {
        onLogin(username, data.points, data.clickPower);
      } else {
        alert("An error occurred during login");
      }
    } catch (error: any) {
      console.error("Error response:", error.response ? error.response : error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <div className="max-w-xs mx-auto p-6 border border-gray-300 rounded-lg text-center">
      <h2 className="text-2xl font-semibold mb-4">Login or Register</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleRegister}
            className="w-1/2 py-2 px-4 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            Register Account
          </button>
          <button
            onClick={handleLogin}
            className="w-1/2 py-2 px-4 ml-2 bg-green-500 text-white rounded-md hover:bg-green-800 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
