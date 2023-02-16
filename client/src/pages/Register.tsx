import Axios from "axios";
import { Link } from "react-router-dom";

interface User {
  name: String;
  email: String;
  password: String;
}

const Register = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resetForm = event.target as HTMLFormElement;
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const newUser: User = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    const res = await Axios.post("http://localhost:5000/api/user", newUser);
    console.log("New user ID:", res.data.user);
    resetForm.reset();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" name="password" />
        </div>
        <button>Register</button>
        <Link to="/">Already have an account?</Link>
      </form>
    </div>
  );
};

export default Register;
