import { useRef } from "react";
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
  name: string;
  email: string;
  password: string;
  confirmPass?: string;
}

const Register = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPass = useRef<HTMLInputElement>(null);

  const createUser = async (resetForm: HTMLFormElement, newUser: User) => {
    try {
      const res = await Axios.post("http://localhost:5000/api/user", newUser);
      console.log("New user ID:", res.data.user);
      resetForm.reset();
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const resetForm = event.target as HTMLFormElement;

    const newUser: User = {
      name: name.current!.value,
      email: email.current!.value,
      password: password.current!.value,
    };

    if (newUser.password !== confirmPass.current!.value)
      return console.log("Passwords did not match!");

    createUser(resetForm, newUser);
  };

  return (
    <Container mt={150}>
      <Card
        p="lg"
        radius="sm"
        withBorder
        style={{ maxWidth: 340, margin: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <Input.Wrapper withAsterisk label="Name">
            <Input id="name" placeholder="Your name" ref={name} />
          </Input.Wrapper>
          <Input.Wrapper withAsterisk label="Email" mt={12}>
            <Input id="email" placeholder="Your email" ref={email} />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            my={12}
            ref={password}
          />
          <PasswordInput
            placeholder="Confirm password"
            label="Confirm password"
            withAsterisk
            my={12}
            ref={confirmPass}
          />
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Text fz="xs">Have an account? Login</Text>
            </Link>
            <Button type="submit" size="sm">
              Register
            </Button>
          </Flex>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
