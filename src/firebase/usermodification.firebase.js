import { updateProfile } from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

const updateName = async (data) => {
    try {
        // Update name in firebase authentication
        await updateProfile(auth.currentUser, {
            displayName: data.name
        })

        // update name in firestore document
        const docRef = doc(db, "users", data.email)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.exists())        
        await updateDoc(docRef, {
            name : data.name
        })

        return { userProfileUpdated: "User Name updated successfully" }
    } catch (error) {
        return {
            errorInCatch: error.message
        }
    }
}

export { updateName }