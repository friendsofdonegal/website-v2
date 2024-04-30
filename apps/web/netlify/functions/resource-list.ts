import crypto from "crypto";
import type { Handler, HandlerEvent } from "@netlify/functions";
import mailchimp from "@mailchimp/mailchimp_marketing";
import sgMail, { type MailDataRequired } from "@sendgrid/mail";
import { BlobServiceClient } from "@azure/storage-blob";
import { render } from "@react-email/components";
import ResourceListEmail from "@fod/emails/emails/resource-list";

interface HandlerBody {
  email?: string;
  optIn?: boolean;
}

const {
  AZURE_STORAGE_CONNECTION,
  MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_LIST_ID,
  SENDGRID_API_KEY,
} = Netlify.env.toObject();

sgMail.setApiKey(SENDGRID_API_KEY!);

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

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

    if (optIn) {
      console.log("Subscribing to mailing list");
      await subscribeToMailingList(email);
    }

    await sendResourceList(email);

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

async function subscribeToMailingList(email: string) {
  try {
    if (!MAILCHIMP_LIST_ID) {
      throw new Error("Mailchimp list ID is missing");
    }

    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    const response = await mailchimp.lists.setListMember(
      MAILCHIMP_LIST_ID,
      subscriberHash,
      {
        email_address: email,
        status_if_new: "pending",
      },
      { skipMergeValidation: true },
    );

    if (isSuccess(response)) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: response.status,
          email: response.email_address,
        }),
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "error",
        error: response.title,
      }),
    };
  } catch (e: any) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "error",
        error: JSON.stringify(e),
      }),
    };
  }
}

async function sendResourceList(email: string) {
  try {
    const msg: MailDataRequired = {
      to: email,
      from: { name: "Friends of Donegal", email: "info@friendsofdonegal.org" },
      subject: "Friends of Donegal - Community Resource List",
      html: render(ResourceListEmail()),
      attachments: [await createPdfAttachment("Community-Resource-List.pdf")],
    };

    await sgMail.send(msg);

    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
}

async function createPdfAttachment(filename: string) {
  if (!AZURE_STORAGE_CONNECTION) {
    throw new Error("Azure Storage connection string is missing");
  }

  // Create the BlobServiceClient object with connection string
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION);

  const containerClient = blobServiceClient.getContainerClient("pdfs");
  const blobClient = containerClient.getBlockBlobClient("Community-Resource-List.pdf");

  const { readableStreamBody } = await blobClient.download();
  if (!readableStreamBody) {
    throw new Error("Failed to download blob");
  }

  const content = await streamToBase64String(readableStreamBody);

  return {
    type: "application/pdf",
    disposition: "attachment",
    content,
    filename,
  };
}

async function streamToBase64String(readableStream: NodeJS.ReadableStream) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];

    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });

    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("base64"));
    });

    readableStream.on("error", reject);
  });
}
