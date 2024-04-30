import * as azureNative from "@pulumi/azure-native";
import { listStorageAccountKeys } from "@pulumi/azure-native/storage";
import * as pulumi from "@pulumi/pulumi";
import * as path from "path";

// Assume the Resource Group is already created and we have its name
const existingResourceGroupName = "rg-friends-of-donegal";

// Create an Azure Storage Account
const storageAccount = new azureNative.storage.StorageAccount("assets", {
  resourceGroupName: existingResourceGroupName,
  kind: "StorageV2",
  sku: {
    name: "Standard_LRS",
  },
});

// Create an Azure Blob Storage Container in the Storage Account
const storageContainer = new azureNative.storage.BlobContainer("pdfs", {
  accountName: storageAccount.name,
  resourceGroupName: existingResourceGroupName,
  publicAccess: azureNative.storage.PublicAccess.None, // or use Blob or Container for public access
});

const resourceListPdfPath = path.join(__dirname, "../assets/pdfs/Community-Resource-List.pdf");
const resourceListPdf = new azureNative.storage.Blob("Community-Resource-List.pdf", {
  resourceGroupName: existingResourceGroupName,
  accountName: storageAccount.name,
  containerName: storageContainer.name,
  source: new pulumi.asset.FileAsset(resourceListPdfPath),
  contentType: "application/pdf",
});

// Export the Storage Account name and Container name
export const accountName = storageAccount.name;
export const containerName = storageContainer.name;

export const accountConnectionString = storageAccount.name.apply((accountName) =>
  listStorageAccountKeys({
    accountName,
    resourceGroupName: existingResourceGroupName,
  }).then((keys) => {
    const primaryStorageKey = keys.keys[0].value;
    return `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${primaryStorageKey};EndpointSuffix=core.windows.net`;
  }),
);

export const blobUrl = pulumi.interpolate`https://${storageAccount.name}.blob.core.windows.net/${containerName}/${resourceListPdf.name}`;
