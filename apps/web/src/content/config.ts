import { z, defineCollection } from "astro:content";

const boardMemberCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.optional(z.string()),
      imageUrl: z.optional(image()),
    }),
});

const Programs = z.enum([
  "FriendsOfDonegal",
  "DonegalPowerPacks",
  "DonegalCommunityGarden",
  "GettingAhead",
]);

export type Program = z.infer<typeof Programs>;

const programCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      summary: z.string(),
      image: image(),
      homepageIndex: z
        .union([z.number(), z.string().length(0), z.string().min(1)])
        .optional()
        .transform((e) => {
          if (typeof e === "number") {
            return e;
          }

          return !e ? undefined : parseInt(e, 10);
        }),
      paypalDonateKey: Programs,
    }),
});

export const collections = {
  ["board-members"]: boardMemberCollection,
  ["programs"]: programCollection,
};

export const siteMetadata = {
  title: "Friends of Donegal",
  description:
    "Friends of Donegal is a non-profit organization that supports Donegal High School students and staff.",
  url: "https://friendsofdonegal.org",
  generalDonateLink:
    "https://www.paypal.com/donate/?business=V8RHKP7HEAHFA&no_recurring=0&item_name=Donegal+Power+Packs&currency_code=USD",
};
