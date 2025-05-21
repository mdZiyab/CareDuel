import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) return;
    localStorage.setItem('username', name);
    onLogin(name);
  };

  return (
    <div className="login-container">
      <h2>CareDuel Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;