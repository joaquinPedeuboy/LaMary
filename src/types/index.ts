import { z } from 'astro:content'

const imageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const featuredImagesSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    medium_large: imageSchema,
    large: imageSchema,
    full: imageSchema,
})

export const BaseWPSchema = z.object({
    id: z.number(),
    title: z.object({
        rendered: z.string()
    }),
    content: z.object({
        rendered: z.string()
    }),
    featured_images: featuredImagesSchema,
    acf: z.object({
        subtitle: z.string()
    })
})

const gallerySchema = z.object({
    large: imageSchema,
    full: imageSchema,
}) 

export const GalleryPageSchema = BaseWPSchema.extend({
    gallery: z.array(gallerySchema)
})

export const NosotrosSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string(),
        worker_1_whatsapp: z.string(),
    })
})

export const ServiciosSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string(),
        service_1: z.string(),
        service_2: z.string(),
        service_3: z.string(),
        description_service_1: z.string(),
        description_service_2: z.string(),
        description_service_3: z.string(),
    })
})

const MarkerSchema = z.object({
    label: z.string(),
    lat: z.number(),
    lng: z.number()
})

const LocationSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    zoom: z.number(),
    markers: z.array(MarkerSchema)
})

export const ContactPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string()
    }).catchall(LocationSchema)
})

export type Gallery = z.infer<typeof gallerySchema>
export type Location = z.infer<typeof LocationSchema>