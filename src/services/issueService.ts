import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Issue {
  id?: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  reporter: {
    name: string;
    email: string;
    phone?: string;
  };
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  assignedTo?: string;
  photos?: string[];
  comments?: Array<{
    id: string;
    text: string;
    author: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION_NAME = 'issues';

export const issueService = {
  // Get all issues
  async getAllIssues(): Promise<Issue[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Issue[];
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error;
    }
  },

  // Get issue by ID
  async getIssueById(id: string): Promise<Issue | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate() || new Date()
        } as Issue;
      }
      return null;
    } catch (error) {
      console.error('Error fetching issue:', error);
      throw error;
    }
  },

  // Create new issue
  async createIssue(issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...issueData,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    }
  },

  // Update issue status
  async updateIssueStatus(id: string, status: Issue['status'], assignedTo?: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData: any = {
        status,
        updatedAt: Timestamp.now()
      };
      
      if (assignedTo !== undefined) {
        updateData.assignedTo = assignedTo;
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating issue status:', error);
      throw error;
    }
  },

  // Add comment to issue
  async addComment(issueId: string, comment: { text: string; author: string }): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, issueId);
      const issue = await this.getIssueById(issueId);
      
      if (issue) {
        const newComment = {
          id: Date.now().toString(),
          text: comment.text,
          author: comment.author,
          createdAt: new Date()
        };
        
        const updatedComments = [...(issue.comments || []), newComment];
        
        await updateDoc(docRef, {
          comments: updatedComments,
          updatedAt: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Get issues by status
  async getIssuesByStatus(status: Issue['status']): Promise<Issue[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Issue[];
    } catch (error) {
      console.error('Error fetching issues by status:', error);
      throw error;
    }
  },

  // Delete issue
  async deleteIssue(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting issue:', error);
      throw error;
    }
  }
};