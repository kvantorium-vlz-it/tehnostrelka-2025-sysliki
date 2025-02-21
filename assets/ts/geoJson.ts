
// import { Schema, z } from "zod";


// const features = z.object({
//     type: z.string(),
//     geometry: z.object({
//         type: z.string(),
//         coordinates: z.array(z.number()).max(2) || z.array(z.array(z.number()).max(2))
//     }),
//     properties: z.object({
//         name: z.string(),
//         description:  z.string()
//     }).optional().nullable()
// })


// export const geoJson = z.object({
//     type: z.string(),
//     features: z.array(features)
// })

// export type GeoJson = z.infer<typeof geoJson>

// import { Schema, z } from "zod";
// const features = z.object({
//     type: z.string(),
//     geometry: z.object({
//         type: z.string(),
//         coordinates: z.array(z.number()).max(2) || z.array(z.array(z.number()).max(2))
//     }),
//     properties: z.object({
//         name: z.string(),
//         description:  z.string()
//     }).optional().nullable()
// })
// export const geoJson = z.object({
//     type: z.string(),
//     features: z.array(features)
// })
// export type GeoJson = z.infer<typeof geoJson>


