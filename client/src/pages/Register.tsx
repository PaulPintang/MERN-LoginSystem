import { useRef, useState } from "react";
import { createUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  TextInput,
  PasswordInput,
  Flex,
  Text,
  Container,
} from "@mantine/core";

export interface User {
  name?: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newUser: User = {
      name,
      email,
      password,
    };
    name && email && password && setProcessing(true);
    const returnUser = await createUser(newUser, setProcessing, setError);
    returnUser && navigate("/");
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
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            value={name}
            error={error?.toLowerCase().includes("name") && error}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            mt={13}
            withAsterisk
            label="Email"
            placeholder="Your email"
            value={email}
            error={error?.toLowerCase().includes("email") && error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            my={13}
            placeholder="Password"
            label="Password"
            withAsterisk
            value={password}
            error={error?.toLowerCase().includes("password") && error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Text fz="xs">Have an account? Login</Text>
            </Link>
            <Button type="submit" size="sm">
              {processing ? "Signing up..." : "Sign up"}
            </Button>
          </Flex>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
