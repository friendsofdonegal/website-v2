import type { Handler, HandlerEvent } from "@netlify/functions";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { Emailer } from "netlify/functions/emailer";

interface HandlerBody {
  email?: string;
  optIn?: boolean;
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

export const handler: Handler = async function (event: HandlerEvent) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers,
      };
    }

    const { email, optIn = false }: HandlerBody = event.body ? JSON.parse(event.body) : {};

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          error: "Email is required",
        }),
      };
    }

    const emailer = new Emailer();

    if (optIn) {
      console.log("Subscribing to mailing list");
      const response = await emailer.subscribeToMailingList(email);

      if (isSuccess(response)) {
        console.log("Subscribed to mailing list", { email });
      } else {
        console.error("Failed to subscribe to mailing list", { email, response });
      }
    }

    await emailer.sendResourceList(email);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "success",
      }),
    };
  } catch (e: any) {
    console.error(e);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        error: "An error occurred.",
      }),
    };
  }
};

function isSuccess(
  response: mailchimp.lists.MembersSuccessResponse | mailchimp.ErrorResponse,
): response is mailchimp.lists.MembersSuccessResponse {
  return (response as any).email_address;
}
