import { HomeIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";

export default function ErrorPage() {
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
      <Heading size={"9"} align={"center"}>
        An error occurred on the server
      </Heading>
      <Text size={"6"}>Please try again later</Text>
      <Button size={"4"} onClick={goHome}>
        <HomeIcon /> Home Page
      </Button>
    </Flex>
  );
}
