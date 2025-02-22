import { z } from "zod";

const moderSchema = z.object({
    route_id: z.number(),
    user_id: z.number()
})

export type Moder = z.infer<typeof moderSchema>