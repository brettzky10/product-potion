import { z } from "zod"

export const productSchema = z.object({
    name: z.string().min(1, { message: "Please include a name."}),
    imagePath: z.string().min(1, { message: "Please include an Image, you our image tools for help."}),
    priceInCents: z.coerce.number().min(1),
    quantity: z.coerce.number().min(1).default(1),
    description: z.string().max(500, 'Max characters reach').min(1, { message: "Please include a name."}),
    isAvailableForPurchase: z.boolean().default(true).optional(),
});