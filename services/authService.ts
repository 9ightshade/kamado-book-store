import { account, ID_TYPE } from "@/lib/appwrite";
import { Models } from "appwrite";
// import {createEmailPasswordSession} from "appwrite";
export const authService = {
  // Create a new account
  async createAccount(
    email: string,
    password: string,
    name: string
  ): Promise<Models.Session | Models.User<Models.Preferences>> {
    try {
      const response = await account.create(
        ID_TYPE.unique(),
        email,
        password,
        name
      );

      if (response) {
        return await this.login(email, password);
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },

  // Login to account
  async login(email: string, password: string): Promise<Models.Session> {
    try {
      const session = await account.createEmailPasswordSession(email, password);

      return session;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return Boolean(user);
    } catch {
      return false;
    }
  },
};
