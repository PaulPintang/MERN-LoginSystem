import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin, userLoggedIn } from "../utils/auth";
import {
  Button,
  Card,
  PasswordInput,
  Flex,
  Text,
  Container,
  TextInput,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { User } from "./Register";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = {
      email,
      password,
    };
    email && password && setProcessing(true);
    const returnToken = await handleLogin(user, setProcessing, setError);
    if (returnToken) {
      const user = await userLoggedIn(returnToken);
      console.log(user);
      localStorage.setItem("user", user);
      navigate("/me");
    }
  };

  return (
    <Container mt={200}>
      <Card
        p="lg"
        radius="sm"
        shadow="xs"
        style={{ maxWidth: 340, margin: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            icon={<MdAlternateEmail />}
            withAsterisk
            label="Email"
            placeholder="Your email"
            value={email}
            error={error?.toLowerCase().includes("email") && error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            icon={<MdLockOutline />}
            my={15}
            placeholder="Password"
            label="Password"
            withAsterisk
            value={password}
            error={error?.toLowerCase().includes("password") && error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/recover">
            <Text fz="xs" align="right" my={13} c="dimmed">
              Forgot password?
            </Text>
          </Link>

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
