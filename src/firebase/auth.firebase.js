import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

const signup = async(data)=>{
    try {
        const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
        if (newUser === undefined){
            return { undefinedErrrorMessage: "unable to create new User" }
        }

        if(newUser){
            const userDoc = {
                uid : newUser.user.uid,
                name : data.name,
                email : data.email,
                mobilenumber : data.mobile_number
            }
            console.log(userDoc)
            await setDoc(doc(db, "users", `${data.email}`), userDoc)
            return {successMessage : "User Created Successfully"}
        }
    } catch (error) {
        if(error.code == "auth/email-already-in-use"){
            return {userExistMeggage : "This user already exists"}
        }
        return { errorCatched: `Error Catched in catch block : ${error.message}` }
    }
}

const signin = async (data)=>{
    console.log(data)
    try {    
        const docRef = doc(db, `users`, `${data.email}`)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.exists())
        const user = docSnap.data()
        console.log(user)
        if(docSnap.exists()){
            await signInWithEmailAndPassword(auth, data.email, data.password)
            return {
                signInSuccess : "User Signed In successfully",
                data : docSnap.data()
            }
        }else{
            return {
            invalidCredentialsMessage: "Invalid Credentials" 
            }
        }        
    } catch (error) {
        if (error.code == "auth/invalid-credential") {
            return { invalidCredentialsMessage: error.message }
        } else {
            console.log("Error in catch", error.code, error.message)
            return {ErrorinCatch : "Unknown Error"}
        }
    }
}

export {signup, signin}