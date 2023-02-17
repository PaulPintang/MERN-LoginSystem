import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/auth";
import {
  Button,
  Card,
  Title,
  Text,
  Container,
  TextInput,
  Center,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { User } from "./Register";

const ForgotPassword = () => {
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
    returnToken && navigate("/me");
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
          <Center>
            <Title order={3}>Forgot your password?</Title>
          </Center>
          <Text fz="xs" align="center">
            Enter your email address and we will share a link to create a new
            password
          </Text>
          <TextInput
            my={16}
            icon={<MdAlternateEmail />}
            withAsterisk
            placeholder="Your email"
            value={email}
            error={error?.toLowerCase().includes("email") && error}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" fullWidth mb={7}>
            {processing ? "Sending..." : "Send"}
          </Button>
          <Link to="/">
            <Text fz="xs">Have an account? Login</Text>
          </Link>
        </form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
