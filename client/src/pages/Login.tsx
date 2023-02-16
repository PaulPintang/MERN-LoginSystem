import Axios from "axios";
import { Link } from "react-router-dom";

interface User {
  email: String;
  password: String;
}

const Login = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resetForm = event.target as HTMLFormElement;
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const newUser: User = {
      email: target.email.value,
      password: target.password.value,
    };

    const res = await Axios.post(
      "http://localhost:5000/api/user/login",
      newUser
    );
    console.log(res.data.token);
    resetForm.reset();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" name="password" />
        </div>
        <button>Login</button>
        <Link to="/register">Create account</Link>
      </form>
    </div>
  );
};

export default Login;
