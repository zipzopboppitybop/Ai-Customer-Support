"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

const SignupForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const account = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("Signed up", user)
        router.push('/')
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorMessage)
        return { errorCode, errorMessage }
        // ..
      });

    console.log(account)
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

export default SignupForm;
