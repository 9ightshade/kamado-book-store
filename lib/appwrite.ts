import { Client, Account, Databases, Storage, ID, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f1af420034eb430b71");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const ID_TYPE = ID;
export const QUERY_TYPE = Query;

//database and collection IDs
export const DATABASES_ID = "67f1b1ea001a7035f04b";
export const BOOKS_COLLECTION_ID = "67f1b21e0017a3dd0496";
export const STORAGE_BUCKET_ID = "67f1cbc30018f823b0f4";

// Helper functions for books
export const appwriteConfig = {
    databaseId: DATABASES_ID,
    booksCollectionId: BOOKS_COLLECTION_ID,
    bucketId: STORAGE_BUCKET_ID
  };