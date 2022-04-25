import { Box, Button, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ProjectService from "../services/ProjectService";
import ProjectForm from "./ProjectForm";

interface ProjectType {
  name: string,
  _id: string
}

function Project({ name, _id, onDeleteSuccess }: {name: string, _id: string, onDeleteSuccess: () => void}) {
  const router = useRouter();

  const handleDelete = useCallback(() => {
    ProjectService.delete(_id).then(onDeleteSuccess)
  }, [_id, onDeleteSuccess]);

  return (
    <Box p={5} shadow='md' borderWidth='1px' w='100%' h='150' bg='papayawhip'>
      <Heading fontSize='xl'>{name}</Heading>
      {/* <Text mt={4}>5</Text> */}
      <Box>
      <Flex alignSelf={"end"} mt={10}>
        <Button colorScheme='red' variant='outline' onClick={handleDelete}>
          Delete
        </Button>
        <Button colorScheme='green' variant='outline' onClick={() => router.push(`/projects/${_id}`)} mx={1}>
          View
        </Button>
      </Flex>
      </Box>
    </Box>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    ProjectService.list().then(setProjects);
  }, []);

  const handleCreateSuccess = useCallback(()=> {
    ProjectService.list().then(setProjects);
  }, []);

  return (
    <Flex p={4} maxWidth={'100vw'}>
      <Stack spacing={8} direction='column'>
        <Box shadow='md' borderWidth='1px' p={3} m={3} maxHeight={170} maxWidth={400}>
          <ProjectForm onCreateSuccess={handleCreateSuccess}/>
        </Box>

        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          {
            projects.map(project => (<Project
              key={project._id}
              onDeleteSuccess={handleCreateSuccess}
              name={project.name}
              _id={project._id}
            />))
            }
        </Grid>
      </Stack>
    </Flex>
  );
};
