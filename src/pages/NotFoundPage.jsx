import { HomeIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
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
      <Heading size={"9"}>404 not found</Heading>
      <Button size={"4"} onClick={goHome}>
        <HomeIcon /> Home Page
      </Button>
    </Flex>
  );
}
