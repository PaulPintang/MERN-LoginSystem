import { useState } from "react";
import Avatar from "react-avatar-edit";

import {
  Container,
  Center,
  Button,
  Title,
  Stack,
  FileButton,
  Avatar as AvatarMantine,
  Text,
  Modal,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/user.png";

const Profile = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [src, setSrc] = useState("");
  const [profile, setProfile] = useState<string | null>(null);
  const [viewImg, setViewImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const onCrop = (view: any) => {
    setViewImg(view);
  };

  const onClose = () => {
    setViewImg(null);
  };

  const saveImage = () => {
    setProfile(viewImg);
    setOpened(false);
  };

  console.log(profile);

  return (
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <Stack>
          <Center>
            <AvatarMantine
              radius={100}
              size={200}
              src={profile ? profile : avatar}
              onClick={() => setOpened(true)}
            />
          </Center>
          <Title order={1}>{localStorage.getItem("user")}</Title>
          <Button onClick={handleLogout}>Sign out</Button>
        </Stack>
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="Update profile!"
        >
          <div>
            <Avatar
              onClose={onClose}
              onCrop={onCrop}
              width={390}
              height={295}
              src={src}
            />
            <Button mt={20} onClick={saveImage}>
              Upload
            </Button>
          </div>
        </Modal>
      </Center>
    </Container>
  );
};

export default Profile;
