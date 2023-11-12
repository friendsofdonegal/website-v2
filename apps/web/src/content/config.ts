import { z, defineCollection } from "astro:content";

const boardMemberCollection = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            title: z.optional(z.string()),
            imageUrl: image(),
        }),
});

export const collections = {
    ["board-members"]: boardMemberCollection,
};
