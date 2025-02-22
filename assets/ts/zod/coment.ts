import { z } from "zod";

const comentSchema = z.object({
    text: z.string(),
    route_id: z.number(),
    user_id: z.number()
})

export type Coment = z.infer<typeof comentSchema>
