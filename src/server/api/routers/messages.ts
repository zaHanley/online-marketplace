import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
});
