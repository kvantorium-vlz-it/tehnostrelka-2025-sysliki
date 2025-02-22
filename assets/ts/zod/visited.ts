import { z } from "zod";

const visitedSchema = z.object({
    route_id: z.number(),
    user_id: z.number(),
})

export type Visited = z.infer<typeof visitedSchema>