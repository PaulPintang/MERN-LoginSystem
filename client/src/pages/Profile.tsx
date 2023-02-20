import React from "react";
import { Container, Card, Button, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container mt={200}>
      <Card p="lg" radius="sm" withBorder>
        <Title order={1}>HELLO {localStorage.getItem("user")}</Title>

        <Button onClick={handleLogout}>Sign out</Button>
      </Card>
    </Container>
  );
};

export default Profile;
