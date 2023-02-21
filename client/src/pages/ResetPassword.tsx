import { useEffect, useState } from "react";
import { handleChangePass } from "../utils/auth";
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
  Alert,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";

export interface User {
  name?: string;
  email: string;
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user: User = {
      email,
      password,
    };
    setProcessing(true);
    if (password === confirmPassword) {
      const res = await handleChangePass(user, setError);
      setProcessing(false);
      res && navigate("/");
    } else {
      setError("Password did not match!");
      setProcessing(false);
    }
  };

  return (
    <Container mt={150}>
      <Card radius="sm" shadow="xs" style={{ maxWidth: 340, margin: "auto" }}>
        <Center>
          <Title order={3}>Set your new password</Title>
        </Center>
        {error?.includes("expired") && (
          <Alert mt={10} color="red">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Password"
            label="Password"
            withAsterisk
            error={error?.toLowerCase().includes("length") && error}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Confirm password"
            label="Confirm password"
            withAsterisk
            value={confirmPassword}
            error={error?.toLowerCase().includes("match") && error}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
          />
          <Button type="submit" color="green" fullWidth mb={7}>
            {processing ? "Updating" : "Set new password"}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
