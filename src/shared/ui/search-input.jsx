'use client';

import React, { useState } from 'react';

import { GoSearch } from 'react-icons/go';

const UserSearch = ({ user }) => {
  const [username, setUsername] = useState(user);
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Hacky way to reset userExists when username is changed.
    setUserExists(-1);
  };

  const handleSearch = async () => {
    setLoading(true);
    setUserExists(0);
    if (!username) {
      setLoading(false);
      return;
    }
    const response = await fetch(`api/users/${username}`);
    const data = await response.json();
    setUserExists(data.id);
    setLoading(false);
  };

  const newUsername = username !== user && username;

  return (
    <div className="w-96">
      <div className="relative flex-auto p-6">
        <label
          className="mb-1 block text-sm font-bold text-black dark:text-white"
          htmlFor="username"
        >
          GitHub username
        </label>
        <div className="relative flex items-center justify-end">
          <input
            placeholder="Search GitHub"
            type="text"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 p-4 text-black placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            value={username}
            onChange={handleUsernameChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <span className="absolute mr-2 w-10 cursor-pointer" onClick={handleSearch}>
            {loading ? '...' : <GoSearch size={32} />}
          </span>
        </div>
      </div>

      {loading ? null : (
        <>
          {userExists > 1 ? (
            <span className="bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text px-6 text-transparent hover:from-pink-500 hover:to-yellow-500">
              <a href={`/?customUsername=${username}`}>
                Preview user: <span className="font-bold">{username}</span>
              </a>
            </span>
          ) : (
            <span className="px-6">
              {userExists !== -1 && newUsername && newUsername !== user ? (
                <span className="text-red-500">
                  User <strong>{newUsername}</strong> not found.
                </span>
              ) : (
                <span className="inline-flex items-baseline text-zinc-500">
                  <span className="pe-2">Click</span>
                  <GoSearch size={16} />
                  <span className="ps-2">
                    or pres <kbd>Enter</kbd> to search GitHub.
                  </span>
                </span>
              )}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default UserSearch;
