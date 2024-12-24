import z from "zod";
export const resendVerifyCodeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
