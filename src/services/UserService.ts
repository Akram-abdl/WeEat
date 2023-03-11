import { User as UserFirebase } from 'firebase/auth';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore';
import { User as UserModel } from '../interfaces/User';
import { firestore } from '../utils/firebaseSetup';

class UserService {
  tableName = 'user';

  async createOrUpdateUserDocument(myUserFirebase: UserFirebase, myUserModel: UserModel) {
    try {
      await setDoc(doc(firestore, this.tableName, myUserFirebase.uid), myUserModel);
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  }

  async getUserDocument(uid: string) {
    const userDocument = await getDoc(doc(firestore, this.tableName, uid));
    return userDocument;
  }

  async getUser(uid: string) {
    const userDocument = await this.getUserDocument(uid);
    if (!userDocument) {
      throw new Error('User not found');
    }

    const user = userDocument.data();

    if (!user) {
      throw new Error('User undefined');
    }
    return user;
  }

  async addFavorite(uid: string, recipeId: number) {
    try {
      const userDocument = await this.getUserDocument(uid);
      if (!userDocument.exists()) {
        throw new Error('User not found');
      }

      const user = userDocument.data();

      const favorites = user.favorites || [];
      favorites.push(recipeId);
      await setDoc(doc(firestore, this.tableName, uid), { ...user, favorites });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }

  async removeFavorite(uid: string, recipeId: number) {
    // find the recipeId in the user's favorites and remove it from the array
    try {
      const userDocument = await this.getUserDocument(uid);
      if (!userDocument.exists()) {
        throw new Error('User not found');
      }

      const user = userDocument.data();

      const favorites = user.favorites || [];
      const newFavorites = favorites.filter((favorite: number) => favorite !== recipeId);
      await setDoc(doc(firestore, this.tableName, uid), { ...user, favorites: newFavorites });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }

  async getFavorites(uid: string): Promise<number[]> {
    // get the user's favorites and return them
    try {
      const userDocument = await this.getUserDocument(uid);

      if (!userDocument.exists()) {
        throw new Error('User not found');
      }

      const user = userDocument.data();

      const favorites = user.favorites || [];
      return favorites;
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }
}
export default new UserService();
