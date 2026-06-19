import { GlobeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { Link } from "react-router";

export default function Header({ theme, changeTheme }) {
  return (
    <header>
      <Card>
        <Flex align={"center"} justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <GlobeIcon />
            <Heading>Social Network</Heading>
          </Flex>

          <Flex align={"center"} gap={"3"}>
            <Link style={{ color: "initial", textDecoration: "underline" }}>
              <Text>Sign In</Text>
            </Link>
            <IconButton onClick={changeTheme}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </Flex>
        </Flex>
      </Card>
    </header>
  );
}
