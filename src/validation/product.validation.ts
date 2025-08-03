import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z.string().optional(),
  category: z.string().min(1, { message: "Please select a category." }),
  status: z.enum(["inStock", "outOfStock"], {
    message: "Please select a valid status.",
  }),
  image: z
    .any()
    .refine(
      (files): files is FileList => files?.length === 1,
      "Product image is required."
    )
    .refine(
      (files): files is FileList => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files): files is FileList =>
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
