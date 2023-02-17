import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleOTP } from "../utils/auth";
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

const SendOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      email && setProcessing(true);
      const OTP = await handleOTP({ email: email }, setProcessing, setError);
      OTP && setProcessing(false);
      console.log(OTP);
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
          <Center>
            <Title order={3}>Forgot your password?</Title>
          </Center>
          <Text fz="xs" align="center">
            Enter your email address and we will send an OTP to recover your
            password
          </Text>
          <TextInput
            my={16}
            icon={<MdAlternateEmail />}
            withAsterisk
            placeholder="Your email"
            value={email}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            mb={7}
            disabled={email.length >= 12 ? false : true}
          >
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

export default SendOTP;
