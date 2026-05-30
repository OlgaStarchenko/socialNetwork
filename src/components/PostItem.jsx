import { ChatBubbleIcon, EyeOpenIcon, HeartIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";

export default function PostItem() {
  return (
    <Box width={"100%"}>
      <Card>
        <Flex direction={"column"} gap={"2"}>
          <Flex justify={"between"}>
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Teodros Girmay
                </Text>
                <Text as="div" size="2" color="gray">
                  Engineering
                </Text>
              </Box>
            </Flex>

            <Flex gap={"2"} maxWidth={"200px"} wrap={"wrap"} justify={"end"}>
              <Badge>history</Badge>
              <Badge>fun</Badge>
              <Badge>programming</Badge>
              <Badge>fun</Badge>
              <Badge>programming</Badge>
            </Flex>
          </Flex>

          <Separator size={"4"} />

          <Flex direction={"column"} gap={"2"}>
            <Heading size={"5"}>Lorem ipsum dolor sit amet.</Heading>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              beatae harum ipsa placeat eos, obcaecati iste natus porro minus
              nemo eaque praesentium sunt quo voluptatem quas magnam illum
              veritatis! Ducimus?
            </Text>
          </Flex>
          <Separator size={"4"} />
          <Flex justify={"between"}>
            <Flex gap={"4"}>
              <Flex align={"center"} gap={"1"}>
                <HeartIcon />
                <Text> 10</Text>
              </Flex>

              <Flex align={"center"} gap={"1"}>
                <ChatBubbleIcon />
                <Text> 10</Text>
              </Flex>
            </Flex>

            <Flex align={"center"} gap={"1"}>
              <EyeOpenIcon />
              <Text> 10</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
