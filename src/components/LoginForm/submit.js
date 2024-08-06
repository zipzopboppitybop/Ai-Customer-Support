"use server";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

export const createAccount = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("Signed up", user)
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
};
