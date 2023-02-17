import axios from "axios";
import { User } from "../pages/Register";

export const handleLogin = async (
  newUser: User,
  setProcessing: (val: boolean) => void
) => {
  try {
    const res = await axios.post("/api/user/login", newUser);
    localStorage.setItem("token", res.data.token);
    localStorage.removeItem("email");
    const token = localStorage.getItem("token");
    return token;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    console.log(err_msg);
    setProcessing(err && false);
  }
};

export const createUser = async (
  newUser: User,
  setProcessing: (val: boolean) => void
) => {
  try {
    const res = await axios.post("/api/user", newUser);
    const user = res.data.user;
    localStorage.setItem("email", newUser.email);
    return user;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    console.log(err_msg);
    setProcessing(err && false);
  }
};