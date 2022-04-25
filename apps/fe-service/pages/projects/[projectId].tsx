import { Flex, Stack } from "@chakra-ui/react";
import Project from "../../components/Project";

export default function ProjectPage() {
  return (
    <Flex p={4} maxWidth={'100vw'}>
      <Stack spacing={8} direction='column'>
        <Project />
      </Stack>
    </Flex>
  );
};
