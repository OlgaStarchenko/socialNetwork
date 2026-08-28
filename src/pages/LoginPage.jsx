import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";

import { useNavigate } from "react-router";
import { setAccessToken } from "../axiosInstance";
import { useState } from "react";
import { useLoginMutation } from "../api/usersApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  const [login, setLogin] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [handleLogin] = useLoginMutation();

  const handleSignIn = async () => {
    const response = await handleLogin({
      username: login,
      password: password,
    });

    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      goHome();
    }
  };

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      gap={"4"}
      minHeight={"100vh"}
    >
      <Card size={"5"}>
        <Heading mb={"4"} size={"7"} align={"center"}>
          Sign In
        </Heading>
        <Card>
          <Flex direction={"column"} gap={"4"} minWidth={"400px"}>
            <Flex direction={"column"} gap={"2"}>
              <Text>Login:</Text>
              <TextField.Root
                placeholder="Username"
                value={login}
                type="text"
                onChange={({ target }) => {
                  setLogin(target.value);
                }}
              />
            </Flex>
            <Flex direction={"column"} gap={"2"}>
              <Text>Password:</Text>
              <TextField.Root
                placeholder="Password"
                type="password"
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </Flex>
            <Button
              disabled={login.trim() === "" || password.trim() === ""}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Flex>
        </Card>
      </Card>
    </Flex>
  );
}
