import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
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
              <TextField.Root placeholder="Username" />
            </Flex>
            <Flex direction={"column"} gap={"2"}>
              <Text>Password:</Text>
              <TextField.Root placeholder="Password" type="password" />
            </Flex>
            <Button>Sign In</Button>
          </Flex>
        </Card>
      </Card>
    </Flex>
  );
}
