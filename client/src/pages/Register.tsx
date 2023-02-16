import Axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  PasswordInput,
  Flex,
  Text,
  Container,
} from "@mantine/core";

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
      confirmPass: { value: string };
    };

    const newUser: User = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    if (newUser.password !== target.confirmPass.value)
      return console.log("Passwords did not match!");

    try {
      const res = await Axios.post("http://localhost:5000/api/user", newUser);
      console.log("New user ID:", res.data.user);
      resetForm.reset();
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  return (
    <Container mt={150}>
      <Card
        p="lg"
        radius="sm"
        withBorder
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <Input.Wrapper withAsterisk label="Name">
            <Input id="name" placeholder="Your name" name="name" />
          </Input.Wrapper>
          <Input.Wrapper withAsterisk label="Email" mt={12}>
            <Input id="email" placeholder="Your email" name="email" />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            name="password"
            my={12}
          />
          <PasswordInput
            placeholder="Confirm password"
            label="Confirm password"
            withAsterisk
            name="confirmPass"
            my={12}
          />
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Text fz="xs">Have an account? Login</Text>
            </Link>
            <Button type="submit">Register</Button>
          </Flex>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
