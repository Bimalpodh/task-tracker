// src/utils/localStorage.js

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// Save task list for a specific user
export const saveUserTasks = (username, tasks) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  users[username] = tasks;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Load task list for a specific user
export const loadUserTasks = (username) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  return users[username] || [];
};

// Save the current logged-in user
export const setCurrentUser = (username) => {
  localStorage.setItem(CURRENT_USER_KEY, username);
};

// Get the current logged-in user
export const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

// Clear session (logout)
export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
