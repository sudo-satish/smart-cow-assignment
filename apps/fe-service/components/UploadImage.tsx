import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React, { useCallback } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import ProjectService from "../services/ProjectService";

export function UploadImage({
  project
}: any) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
  ) => {
    console.log(imageList);
    
    setImages(imageList as never[]);
  };

  const uploadImages = useCallback(() => {
    ProjectService.uploadImages(project._id, images).then(() => {
      setImages([]);
    })
  }, [images, setImages, project]);

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button colorScheme='teal' variant='ghost'
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            &nbsp;
            <Button colorScheme='red' variant='ghost' onClick={onImageRemoveAll}>Remove all images</Button>
            <Button colorScheme='red' variant='ghost' onClick={uploadImages}>Upload Selected Images</Button>
            {imageList.map((image, index) => (
              <Box key={index} className="image-item" shadow={'md'} m={5} border={"1px"}>
                <Box p={3}>
                  <Image src={image.dataURL} alt=""  boxShadow='md' />
                </Box>
                <Flex className="image-item__btn-wrapper" boxShadow='lg' border={"1px"}>
                  <Button colorScheme='pink' variant='ghost' onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button colorScheme='pink' variant='ghost' onClick={() => onImageRemove(index)}>Remove</Button>
                </Flex>
              </Box>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
