import { z } from "zod"
import prisma from "~/lib/prisma"
import { fileSchema } from "./file"
// import { fileSchema } from "./file"

const imageSchema = z.object({
    src: z.string(),
    alt: z.string().optional().nullable(),
})

const placeSchema = z.object({
    name: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    lot: z.number(),
    lat: z.number(),
    images: z.array(fileSchema.nullable())
})

const cityExistsCheck = z.custom<number>((data) => prisma.city.findUnique({
    where: { id: data }
}), { message: 'Города не существует в базе данных' })

export const routeSchema = z.object({
    name: z.string(),
    description: z.string(),
    privateRoute: z.boolean(),
    city_id: z.number().and(cityExistsCheck),
    places: z.array(placeSchema).min(2, 'Маршрут не может состоять из меньше, чем 2 мест'),
    images: z.array(fileSchema.nullable()),
    approved: z.boolean()
})

export type Route = z.infer<typeof routeSchema>