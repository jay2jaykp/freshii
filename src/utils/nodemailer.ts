/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

// async..await is not allowed in global scope, must use a wrapper
export const nodeMailer = async ({
  name,
  buyersEmail,
  total,
  orderNumber,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orders,
}: {
  name: string;
  buyersEmail: string;
  total: number;
  orderNumber: string;
  orders: {
    date: Date;
    dish: {
      name: string;
      price: number;
    } | null;
    protein: {
      name: string;
      price: number;
    } | null;
  }[];
}) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   const testAccount = await nodemailer.createTestAccount();
  // const test = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: env.EMAIL, // generated ethereal user
      pass: env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  const table = orders.map(
    (order) => `
    <tr>
      <th colspan="2" align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">${order.date.toDateString()}</th>
    </tr>
    <tr>
      <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">${
        order.dish?.name || "None"
      }</th>
      <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">$ ${
        order.dish?.price || 0
      }</td>
    </tr>
    <tr>
      <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">${
        order.protein?.name || "None"
      }</th>
      <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">$ ${
        order.protein?.price || 0
      }</td>
    </tr>
  `
  );

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Freshii Kanata" <foo@example.com>', // sender address
    to: buyersEmail, // list of receivers
    subject: "Your Freshii Order", // Subject line
    // text: "Hello world?", // plain text body
    html: `
    <style>
 	body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
	table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
	img { -ms-interpolation-mode: bicubic; }
	img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
	table { border-collapse: collapse !important; }
	body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
	a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
	div[style*="margin: 16px 0;"] { margin: 0 !important; }
 	</style>
	<body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;">
	
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td bgcolor="#426899" align="center">
					<table border="0" cellpadding="0" cellspacing="0" width="480" >
						<tr>
							<td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
								<div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">Freshii - Kanata North</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td bgcolor="#426899" align="center" style="padding: 0px 10px 0px 10px;">
					<table border="0" cellpadding="0" cellspacing="0" width="480" >
						<tr>

							<td bgcolor="#ffffff" align="left" valign="top" style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
							<p style="font-size: 28px; font-weight: 400; margin: 0;">Hi, ${name}</p>
                <p style="font-size: 29px; font-weight: 400; margin: 0;">Thank you for your Order!</p>	
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
					<table border="0" cellpadding="0" cellspacing="0" width="480" >
						<tr>
							<td bgcolor="#ffffff" align="left">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td colspan="2" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                      <p>Order no. ${orderNumber}</p>
                    </td>
                  </tr>
									${table.join("")}
                    <tr style="border-top: 0.5px solid grey;">
										<th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">Subtotal</th>
										<td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">$ ${total.toFixed(
                      2
                    )}</td>
									</tr>
                   <tr>
										<th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">HST</th>
										<td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">$ ${(
                      total * 0.13
                    ).toFixed(2)}</td>
									</tr>
                   <tr>
										<th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 600; line-height: 25px;">Total</th>
										<td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 600; line-height: 25px;">$ ${(
                      total * 1.13
                    ).toFixed(2)}</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td bgcolor="#ffffff" align="center">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;">
											<table border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td align="left" style="border-radius: 3px;" bgcolor="#426899">
														<a href="mailto:freshiikanatanorth@gmail.com" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #426899; display: inline-block;">Questions?</a>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="480">
					<tr>
						<td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
							<p style="margin: 0;">Email us at "<a href="mailto:freshiikanatanorth@gmail.com" target="_blank" style="color: #111111; font-weight: 700;">freshiikanatanorth@gmail.com<a>"</p>
						</td>
					</tr>
				</td>
			</tr>
		</table>
	
	</body>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
