import { ExitIcon, GlobeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { changeTheme } from "../store/slice/themeSlice";

export default function Header() {
  let isAuth = localStorage.getItem("accessToken");

  const { currentTheme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const dispatch = useDispatch();

  return (
    <header>
      <Card>
        <Flex align={"center"} justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <GlobeIcon />
            <Heading>Social Network</Heading>
          </Flex>

          <Flex align={"center"} gap={"3"}>
            {isAuth ? (
              <Flex gap="3" align="center">
                <Link
                  to={"/person/1"}
                  style={{ color: "initial", textDecoration: "underline" }}
                >
                  <Text>Profile</Text>
                </Link>

                <IconButton variant="outline" onClick={handleExit}>
                  <ExitIcon />
                </IconButton>
              </Flex>
            ) : (
              <Link
                to={"/login"}
                style={{ color: "initial", textDecoration: "underline" }}
              >
                <Text>Sign In</Text>
              </Link>
            )}

            <IconButton onClick={() => dispatch(changeTheme())}>
              {currentTheme === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </Flex>
        </Flex>
      </Card>
    </header>
  );
}
