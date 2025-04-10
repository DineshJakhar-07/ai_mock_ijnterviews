import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { CollectionReference } from "firebase-admin/firestore";


export async function getInterviewsByUserId(userId:string): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    
    id: doc.id,
    ...doc.data()
    
  })) as Interview[];
  
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const { userId: excludedUserId, limit = 20 } = params;
  
  try {
    // First get all finalized interviews ordered by date
    const results = await db.collection("interviews")
      .where("finalized", "==", true)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    // Then filter out the current user's interviews in memory
    return results.docs
      .filter(doc => doc.data().userId !== excludedUserId)
      .map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Interview[];
      
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return null;
  }
}

export async function getInterviewsById(
  id: string
): Promise<Interview | null> {
  const interviews = await db
    .collection("interviews")
    .doc(id)
    .get();

  return interviews.data() as Interview | null;
}

