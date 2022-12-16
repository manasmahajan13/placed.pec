import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const resetPassword = async (email) => {
  const auth = getAuth();
  const response = await sendPasswordResetEmail(auth, email);
  console.log("email sent at ", email);
  return response;
};
