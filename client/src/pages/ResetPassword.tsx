import { useEffect, useState } from "react";
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
  Title,
  Center,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";

export interface User {
  name?: string;
  email: string;
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [name, email, password]);

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
      <Card radius="sm" shadow="xs" style={{ maxWidth: 340, margin: "auto" }}>
        <Center>
          <Title order={3}>Set your new password</Title>
        </Center>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Password"
            label="Password"
            withAsterisk
            value={password}
            error={error?.toLowerCase().includes("password") && error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Confirm password"
            label="Confirm password"
            withAsterisk
            value={password}
            error={error?.toLowerCase().includes("password") && error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="green" fullWidth mb={7}>
            Set new password
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
