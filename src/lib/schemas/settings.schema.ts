import { z } from 'zod'

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2 // 2MB
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']


export const AddDomainSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'A store name must have atleast 3 characters' }),
      /* .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
        'This is not a valid name'
      ), */
    subdomain: z
      .string()
      .min(3, { message: 'A store name must have atleast 3 characters' }),
      /* .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
        'This is not a valid subdomain'
      ), */
    image: z
      .any()
      .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
        message: 'Your file size must be less then 2MB',
      })
      .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
        message: 'Only JPG, JPEG & PNG are accepted file formats',
      }),
  })