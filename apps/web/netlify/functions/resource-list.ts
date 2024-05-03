import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
import sgMail, { type MailDataRequired } from "@sendgrid/mail";
import { BlobServiceClient } from "@azure/storage-blob";
import { render } from "@react-email/components";
import ResourceListEmail from "@fod/emails/emails/resource-list";
import "@netlify/functions";

interface HandlerBody {
  email?: string;
  optIn?: boolean;
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

export default async (request: Request) => {
  try {
    if (request.method === "OPTIONS") {
      return Response.json({
        statusCode: 204,
        headers,
      });
    }

    const { email, optIn = false }: HandlerBody = await request.json();

    if (!email) {
      return Response.json({
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          error: "Email is required",
        }),
      });
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

    return Response.json({
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "success",
      }),
    });
  } catch (e: any) {
    console.error(e);
    return Response.json({
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        error: "An error occurred.",
      }),
    });
  }
};

function isSuccess(
  response: mailchimp.lists.MembersSuccessResponse | mailchimp.ErrorResponse,
): response is mailchimp.lists.MembersSuccessResponse {
  return (response as any).email_address;
}

class Emailer {
  readonly #azureStorageConnection: string;
  readonly #mailchimpListId: string;

  constructor() {
    const {
      AZURE_STORAGE_CONNECTION,
      MAILCHIMP_API_KEY,
      MAILCHIMP_SERVER_PREFIX,
      MAILCHIMP_LIST_ID,
      SENDGRID_API_KEY,
    } = Netlify.env.toObject();

    if (!SENDGRID_API_KEY) {
      throw new Error("SendGrid API key is missing");
    }

    if (!AZURE_STORAGE_CONNECTION) {
      throw new Error("Azure Storage connection string is missing");
    }

    if (!MAILCHIMP_LIST_ID) {
      throw new Error("Mailchimp list ID is missing");
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    mailchimp.setConfig({
      apiKey: MAILCHIMP_API_KEY,
      server: MAILCHIMP_SERVER_PREFIX,
    });

    this.#azureStorageConnection = AZURE_STORAGE_CONNECTION;
    this.#mailchimpListId = MAILCHIMP_LIST_ID;
  }

  subscribeToMailingList(email: string) {
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    return mailchimp.lists.setListMember(
      this.#mailchimpListId,
      subscriberHash,
      {
        email_address: email,
        status_if_new: "pending",
      },
      { skipMergeValidation: true },
    );
  }

  async sendResourceList(email: string) {
    const msg: MailDataRequired = {
      to: email,
      from: { name: "Friends of Donegal", email: "info@friendsofdonegal.org" },
      subject: "Friends of Donegal - Community Resource List",
      html: render(ResourceListEmail()),
      attachments: [await this.createPdfAttachment("Community-Resource-List.pdf")],
    };

    await sgMail.send(msg);
  }

  private async createPdfAttachment(filename: string) {
    // Create the BlobServiceClient object with connection string
    const blobServiceClient = BlobServiceClient.fromConnectionString(this.#azureStorageConnection);

    const containerClient = blobServiceClient.getContainerClient("pdfs");
    const blobClient = containerClient.getBlockBlobClient("Community-Resource-List.pdf");

    const { readableStreamBody } = await blobClient.download();
    if (!readableStreamBody) {
      throw new Error("Failed to download blob");
    }

    const content = await this.streamToBase64String(readableStreamBody);

    return {
      type: "application/pdf",
      disposition: "attachment",
      content,
      filename,
    };
  }

  private async streamToBase64String(readableStream: NodeJS.ReadableStream) {
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
}
