import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const messagesRouter = createTRPCRouter({
  newMessage: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        listingId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.message.create({
        data: {
          ...input,
          fromUser: ctx.auth.userId,
          fromUserName: ctx.auth.user?.username ?? "unknown",
          content: input.content,
          listingId: input.listingId,
        },
      });
      return message;
    }),
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    const listings = await ctx.prisma.listing.findMany({
      where: {
        userId,
      },
      include: {
        Message: true,
      },
    });
    return listings.flatMap((item) => item.Message);
  }),
});
