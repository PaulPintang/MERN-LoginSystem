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
import { ButtonGroup } from "@mantine/core/lib/Button/ButtonGroup/ButtonGroup";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

    return () => {
      setUser(null);
    };
  }, [processing]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const onCrop = (view: any) => {
    setViewImg(view);
  };

  const onClose = () => {
    setViewImg(null);
    setError(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await axios.put("/api/user/upload", {
        image: viewImg,
        _id: user!._id,
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

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`api/user/me/${user?._id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      res && handleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <Stack>
          <Center>
            <AvatarMantine
              radius={100}
              size={200}
              src={user?.image || avatar}
              onClick={() => setOpened(true)}
            />
          </Center>
          <div style={{ textAlign: "center" }}>
            <Title order={1}>{user?.name}</Title>
            <Text fz="sm" c="dimmed">
              {user?.email}
            </Text>
          </div>
          <Center>
            <Button onClick={handleLogout} style={{ width: 100 }} mr="sm">
              Sign out
            </Button>
            <Button onClick={handleDelete} style={{ width: 100 }} color="red">
              Delete
            </Button>
          </Center>
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
