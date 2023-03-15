import { z } from "zod";
import { nodeMailer } from "../../../utils/nodemailer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        total: z.number(),
        orderNumber: z.string(),
        orders: z.array(
          z.object({
            date: z.date(),
            dish: z
              .object({
                name: z.string(),
                price: z.number(),
              })
              .nullable(),
            protein: z
              .object({
                name: z.string(),
                price: z.number(),
              })
              .nullable(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      // await nodeMailer({ buyersEmail: input.buyersEmail, total: input.total, orders: input.order });
      await nodeMailer(input);
    }),

  approveOrder: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        total: z.number(),
        subtotal: z.number(),
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
        const { id, name, email, order, payment_status, total, subtotal } =
          input;
        const paymentId = (
          await ctx.prisma.payment.create({
            data: {
              id,
              name,
              email,
              payment_status,
              total,
              subtotal,
            },
          })
        ).id;

        await ctx.prisma.order.createMany({
          data: order.map((each) => {
            const { date, dish, protein } = each;
            return {
              payment_id: paymentId,
              date,
              dish,
              protein,
            };
          }),
        });

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

  // emailTest: publicProcedure.query(async () => {
  //   await nodeMailer({
  //     buyersEmail: "jay2jaykp@gmail.com",
  //     total: 2,
  //     orderNumber: "13123232",
  //     orders: [],
  //   });
  // }),
});
