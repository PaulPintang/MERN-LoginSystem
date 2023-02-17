import { useRef, useState } from "react";
import { createUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
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
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setProcessing(true);
    event.preventDefault();
    const newUser: User = {
      name: name.current!.value,
      email: email.current!.value,
      password: password.current!.value,
    };
    const returnUser = await createUser(newUser, setProcessing);
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
          <Input.Wrapper withAsterisk label="Name">
            <Input id="name" placeholder="Your name" ref={name} required />
          </Input.Wrapper>
          <Input.Wrapper withAsterisk label="Email" mt={12}>
            <Input id="email" placeholder="Your email" ref={email} required />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            my={12}
            ref={password}
            required
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
