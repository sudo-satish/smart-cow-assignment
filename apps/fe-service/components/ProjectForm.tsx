import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import ProjectService from '../services/ProjectService'
import { useCallback } from 'react';

export default function ProjectForm({onCreateSuccess}: {onCreateSuccess: () => void}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = useCallback((values: any) => {
    return ProjectService.create(values).then(onCreateSuccess);
  }, [onCreateSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='name'>Project Name</FormLabel>
        <Input
          id='name'
          placeholder='Project name'
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' variant={'outline'} isLoading={isSubmitting} type='submit'>
        Create
      </Button>
    </form>
  )
};
