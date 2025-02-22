import { z } from "zod";

const ratingSchema = z.object({
    route_id: z.number(),
    user_id: z.number(),
    value: z.number().max(5).min(1)
})

export type Rating = z.infer<typeof ratingSchema>