import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  PasswordInput,
  Flex,
  Text,
  Container,
  Loader,
} from "@mantine/core";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

interface User {
  email: String;
  password: String;
}

const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (resetForm: HTMLFormElement, newUser: User) => {
    try {
      const res = await axios.post("/api/user/login", newUser);
      localStorage.setItem("token", res.data.token);
      //   setProcessing(false);
      navigate("/me");
      //   resetForm.reset();
    } catch (err: any) {
      console.log(err.response.data.error);
      setProcessing(err && false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const resetForm = event.target as HTMLFormElement;

    const newUser: User = {
      email: email.current!.value,
      password: password.current!.value,
    };
    setProcessing(true);
    handleLogin(resetForm, newUser);
  };

  return (
    <Container mt={200}>
      <Card
        p="lg"
        radius="sm"
        withBorder
        style={{ maxWidth: 340, margin: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <Input.Wrapper id="email" withAsterisk label="Email">
            <Input
              id="email"
              placeholder="Your email"
              ref={email}
              color="yellow"
            />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            my={14}
            ref={password}
          />
          <Flex justify="space-between" align="center">
            <Link to="/register">
              <Text fz="xs">Don't have an account? Register</Text>
            </Link>
            <Button type="submit">
              {processing ? "Signing in..." : "Sign in"}
            </Button>
          </Flex>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
