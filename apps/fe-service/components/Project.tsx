import { Box, Flex, Heading, Image, Input, Spinner, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import '@recogito/annotorious/dist/annotorious.min.css';
import ProjectService from "../services/ProjectService";


interface ProjectType {
  name: string,
  _id: string
}

interface ImagesType {
  originalname: string,
  _id: string
}


const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_BE_SERVICE_URL ||
  "http://localhost:3001";

function AnnotationImage ({src, name, imageId}: any) {
  useEffect(() => {
    // @ts-ignore
    import('@recogito/annotorious').then(Annotorious => {
      const anno = new Annotorious.Annotorious({ image: name });
      ProjectService.fetchAnnotations(imageId).then((annotations: any) => {
        if (annotations) {
          annotations.forEach((annotation: any) => {
            anno.addAnnotation(annotation, true);
          })
        }
      })
      anno.on('createAnnotation', (e: any) => {
        ProjectService.createAnnotation(imageId, e);
      })
    })
  }, [name, imageId]);
  if (typeof window === "undefined") {
    return <Spinner />
  }
  return (
    <Image src={src} alt={name} id={name}  boxShadow='md' />
  )
}

export default function Project() {
  const [project, setProject] = useState<ProjectType>();
  const [images, setImages] = useState<ImagesType[]>([]);
  const router = useRouter();
  const { projectId } = router.query;

  const fetchImages = useCallback(() => {
    ProjectService.fetchImages(projectId as string).then(setImages)
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      ProjectService.find(projectId as string).then(setProject);
      fetchImages();
    }
  }, [projectId, fetchImages]);

  const handleFileUpload = useCallback((event: any) => {
    const files = event.target.files
    ProjectService.uploadImages(projectId as string, [files[0]]).then(() => setTimeout(fetchImages, 100));
  }, [projectId, fetchImages]);

  const handleImageDelete = useCallback((imageId: string) => {
    ProjectService.deleteImage(imageId).then(() => setTimeout(fetchImages, 100));
  }, [fetchImages]);
  
  if (!project) {
    return<Spinner />
  }

  return (
    <Flex p={4} maxWidth={'100vw'}>
      <Stack spacing={8} direction='column'>
        <Box shadow='md' borderWidth='1px' p={3} m={3} maxHeight={170}>
          <Heading>{project.name}</Heading>
        </Box>
        <Box>
        </Box>
        <Box>
          <Input type="file" onChange={handleFileUpload}/>
        </Box>
        <Box>
          {
            images.map((image) => (
              <Box key={image._id} p={3} shadow={'md'} m={5} border={"1px"}>
                <AnnotationImage
                  imageId={image._id}
                  src={`${AUTH_SERVICE_URL}/images/stream/${image._id}/${image.originalname}`}
                  name={image.originalname} />
              </Box>
            ))
          }
        </Box>
      </Stack>
    </Flex>
  );
};
