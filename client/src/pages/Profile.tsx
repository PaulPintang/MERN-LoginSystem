import React from "react";
import { Container, Card, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container mt={200}>
      <Card
        p="lg"
        radius="sm"
        withBorder
        style={{ maxWidth: 340, margin: "auto" }}
      >
        <Button onClick={handleLogout}>Sign out</Button>
      </Card>
    </Container>
  );
};

export default Profile;
