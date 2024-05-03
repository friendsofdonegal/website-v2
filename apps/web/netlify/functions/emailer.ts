import crypto from "crypto";
import mailchimp from "@mailchimp/mailchimp_marketing";
import sgMail, { type MailDataRequired } from "@sendgrid/mail";
import { BlobServiceClient } from "@azure/storage-blob";
import { render } from "@react-email/components";
import ResourceListEmail from "@fod/emails/emails/resource-list";

export interface EmailerOptions {
  AZURE_STORAGE_CONNECTION?: string;
  MAILCHIMP_API_KEY?: string;
  MAILCHIMP_SERVER_PREFIX?: string;
  MAILCHIMP_LIST_ID?: string;
  SENDGRID_API_KEY?: string;
}

export class Emailer {
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
