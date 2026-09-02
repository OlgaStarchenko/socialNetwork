import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

export default function ErrorMessage({ error }) {
  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{error?.data?.message || "Server error"}</Callout.Text>
    </Callout.Root>
  );
}
