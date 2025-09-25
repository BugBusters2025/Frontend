import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  updateDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/contexts/AuthContext';

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  admins: number;
  resolvers: number;
  viewers: number;
}

const COLLECTION_NAME = 'users';

export const userService = {
  // Get all users
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as UserProfile[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  async getUserById(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date()
        } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Update user role
  async updateUserRole(uid: string, role: UserProfile['role']): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, uid);
      await updateDoc(docRef, { role });
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },

  // Get users by role
  async getUsersByRole(role: UserProfile['role']): Promise<UserProfile[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('role', '==', role),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as UserProfile[];
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw error;
    }
  },

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    try {
      const users = await this.getAllUsers();
      
      return {
        totalUsers: users.length,
        activeUsers: users.length, // Assuming all users are active for now
        admins: users.filter(u => u.role === 'admin').length,
        resolvers: users.filter(u => u.role === 'resolver').length,
        viewers: users.filter(u => u.role === 'viewer').length
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }
};