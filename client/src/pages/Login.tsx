import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/auth";
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
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement | any>();
  const password = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    email.current.value = localStorage.getItem("email");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    const newUser: User = {
      email: email.current.value,
      password: password.current!.value,
    };
    const returnToken = await handleLogin(newUser, setProcessing);
    returnToken && navigate("/me");
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
            <Input id="email" placeholder="Your email" ref={email} required />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            my={14}
            ref={password}
            required
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
