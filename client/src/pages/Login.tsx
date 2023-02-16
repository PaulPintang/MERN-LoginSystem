import Axios from "axios";
import { Link } from "react-router-dom";
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
  email: String;
  password: String;
}

const Login = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resetForm = event.target as HTMLFormElement;
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const newUser: User = {
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const res = await Axios.post(
        "http://localhost:5000/api/user/login",
        newUser
      );
      console.log(res.data.token);
      resetForm.reset();
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  return (
    <Container mt={200}>
      <Card
        p="lg"
        radius="sm"
        withBorder
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <Input.Wrapper id="email" withAsterisk label="Email">
            <Input id="input-demo" placeholder="Your email" name="email" />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            name="password"
            my={14}
          />
          <Flex justify="space-between" align="center">
            <Link to="/register">
              <Text fz="xs">Don't have an account? Register</Text>
            </Link>
            <Button type="submit">Login</Button>
          </Flex>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
