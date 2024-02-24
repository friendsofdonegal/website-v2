import { z, defineCollection } from "astro:content";

const boardMemberCollection = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            title: z.optional(z.string()),
            imageUrl: z.optional(image()),
        }),
});

const programCollection = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            summary: z.string(),
            image: image(),
        }),
});

export const collections = {
    ["board-members"]: boardMemberCollection,
    ["programs"]: programCollection,
};
