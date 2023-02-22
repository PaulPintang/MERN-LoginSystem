import { useState, useEffect, useContext } from "react";
import Avatar from "react-avatar-edit";
import axios from "axios";
import {
  Container,
  Center,
  Button,
  Title,
  Stack,
  Avatar as AvatarMantine,
  Text,
  Modal,
  Alert,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/user.png";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [profile, setProfile] = useState<string | null>(null);
  const [viewImg, setViewImg] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/user/me", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res.data));
  }, [profile]);

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(viewImg);
    setProcessing(true);

    try {
      const res = await axios.put("/api/user/upload", {
        image: viewImg,
        email: user?.email,
      });
      setUser({
        ...user!,
        image: res.data.image.url,
      });
      res && setProcessing(false);
      res && setOpened(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setError(true);
    }
  };

  console.log("PROFILE", profile);

  return (
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <Stack>
          <Center>
            <AvatarMantine
              radius={100}
              size={200}
              src={user?.image ? user.image : avatar}
              onClick={() => setOpened(true)}
            />
          </Center>
          <div style={{ textAlign: "center" }}>
            <Title order={1}>{user?.name}</Title>
            <Text fz="sm" c="dimmed">
              {user?.email}
            </Text>
          </div>

          <Button
            onClick={handleLogout}
            style={{ width: "50%", margin: "auto" }}
          >
            Sign out
          </Button>
        </Stack>
        <Modal
          centered
          opened={opened}
          onClose={() => {
            setOpened(false);
            setError(false);
          }}
          title="Update profile"
          size="sm"
        >
          <form onSubmit={handleUpload}>
            <div>
              <Avatar
                onClose={onClose}
                onCrop={onCrop}
                width="100%"
                height={295}
              />
              {error && (
                <Alert color="red" mt={10}>
                  <small>Something went wrong! Try to change your image</small>
                </Alert>
              )}

              <Button type="submit" mt={10}>
                {processing ? "Uploading" : "Upload"}
              </Button>
            </div>
          </form>
        </Modal>
      </Center>
    </Container>
  );
};

export default Profile;
