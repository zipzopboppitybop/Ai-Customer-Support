"use client"

import React, { useState } from 'react';
import { createAccount } from './submit';


const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const account = createAccount(email, password);
    console.log(account);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>

        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='text-black'
        />

        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='text-black'
        />

        <input
          placeholder='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='text-black'
        />

        <button type='submit' onClick={handleSubmit}>Sign up</button>

      </form>
    </div>
  )
};

export default LoginForm;
