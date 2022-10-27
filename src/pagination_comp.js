import {db} from "./firebase-config"
import {collection,getDocs,doc, query, orderBy, startAfter, limit,getDoc} from "firebase/firestore"

export const CompanyDataRetrieval=async(page_size,page_no)=>{
    var Query = query(collection(db, "company"), orderBy("Published") ,limit(page_size));

    for(let i=0;i<page_no-1;i++){
      const documentSnapshot = await getDocs(Query)
  
      // Get the last visible document
      const lastVisible = documentSnapshot.docs[documentSnapshot.docs.length-1];
  
      // Construct a new query starting at this document,
       Query = query(collection(db, "company"),
          orderBy("Published"),
          startAfter(lastVisible),
          limit(page_size));
    }
    const documentSnapshots = await getDocs(Query);
    const InfoOfCompany=[];
    console.log(documentSnapshots.docs.length);
    for (let j = 0; j < documentSnapshots.docs.length; j++) {
      const compId=documentSnapshots.docs[j].id;
      const docRef = doc(db, "company", compId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        InfoOfCompany.push(docSnap.data()) 
      }
    }
    for (let j = 0; j < documentSnapshots.docs.length; j++) {
      console.log(InfoOfCompany[j]);
    }  
}