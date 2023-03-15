import { z } from "zod";
import { nodeMailer } from "../../../utils/nodemailer";
import { Payment } from "../../../components/Payment";
import { prisma } from "../../db";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  sendEmail: publicProcedure.query(async () => {
    await nodeMailer();
  }),

  approveOrder: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        payment_status: z.enum([
          "COMPLETED",
          "SAVED",
          "APPROVED",
          "VOIDED",
          "PAYER_ACTION_REQUIRED",
        ]),
        order: z.array(
          z.object({
            date: z.date(),
            dish: z.string().nullable(),
            protein: z.string().nullable(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { id, name, email, order, payment_status } = input;
        const paymentId = (
          await ctx.prisma.payment.create({
            data: {
              id,
              name,
              email,
              payment_status,
            },
          })
        ).id;

        const trx = order.map((each) => {
          const { date, dish, protein } = each;
          return ctx.prisma.order.create({
            data: {
              payment_ref: {
                connect: {
                  id: paymentId,
                },
              },
              date,
              dish,
              protein,
            },
          });
        });

        await ctx.prisma.$transaction(trx);
        return {
          status: "success",
        };
      } catch (error) {
        console.log("🚀 ~ file: example.ts:76 ~ .query ~ error:", error);
        return {
          status: "error",
        };
      }
    }),

  getAllOrders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany({});
  }),
});
