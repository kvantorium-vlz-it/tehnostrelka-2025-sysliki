import { z } from "zod";

const favoritesSchema = z.object({
    route_id: z.number(),
    // user_id: z.number()
})

export type Favorites = z.infer<typeof favoritesSchema>