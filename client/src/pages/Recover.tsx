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
  NumberInput,
  UnstyledButton,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { User } from "./Register";

const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [OTP, setOTP] = useState<number | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    email && setProcessing(true);
    const OTP = await handleOTP(
      { email: email },
      setProcessing,
      setError,
      setStatus
    );
    OTP && setProcessing(false);
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
          {status === 200 ? (
            <>
              <Center>
                <Title order={3}>Verify email</Title>
              </Center>
              <Text fz="xs" align="center">
                Enter the 6 digit code we sent to your email
              </Text>

              <NumberInput
                my={10}
                hideControls
                value={OTP!}
                onChange={(value) => setOTP(value!)}
              />

              <Button
                color="green"
                type="submit"
                fullWidth
                mb={7}
                disabled={OTP!?.toString().length >= 6 ? false : true}
              >
                {/* {processing ? "Verifying..." : "Continue"} */}
                Continue
              </Button>

              <Text fz="xs" align="center">
                Didn't receive code? {""}
                <UnstyledButton type="submit">
                  <Text fz="xs" align="center" color="green">
                    Resend
                  </Text>
                </UnstyledButton>
              </Text>
            </>
          ) : (
            <>
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
              <Link to="/register">
                <Text fz="xs">Don't have an account? Register</Text>
              </Link>
            </>
          )}
        </form>
      </Card>
    </Container>
  );
};

export default Recover;
