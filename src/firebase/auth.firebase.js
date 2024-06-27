import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { auth, db, googleAuthProvider } from "./firebase"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

const signup = async (data) => {
    try {
        const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
        console.log(newUser)
        if (newUser === undefined) {
            return { undefinedErrrorMessage: "unable to create new User" }
        }

        if (newUser) {
            updateProfile(auth.currentUser, {
                displayName: data.name,
                phoneNumber : data.mobile_number
            })
            // console.log(newUser)

            // The above method is also to update/add the user but it will not add it to firestore or the storage bucket.
            const userDoc = {
                uid: newUser.user.uid,
                name: data.name,
                email: data.email,
                mobilenumber: data.mobile_number,
                timestamp: serverTimestamp(),
            }
            // console.log(userDoc)
            await setDoc(doc(db, "users", `${data.email}`), userDoc)
            return { successMessage: "User Created Successfully" }
        }
    } catch (error) {
        if (error.code == "auth/email-already-in-use") {
            return { userExistMeggage: "This user already exists" }
        }
        return { errorCatched: `Error Catched in catch block : ${error.message}` }
    }
}

const signin = async (data) => {
    console.log(data)
    try {
        const docRef = doc(db, `users`, `${data.email}`)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.exists())
        const user = docSnap.data()
        console.log(user)
        if (docSnap.exists()) {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            return {
                signInSuccess: "User Signed In successfully",
                data: docSnap.data()
            }
        } else {
            return {
                invalidCredentialsMessage: "Invalid Credentials"
            }
        }
    } catch (error) {
        if (error.code == "auth/invalid-credential") {
            return { invalidCredentialsMessage: error.message }
        } else {
            console.log("Error in catch", error.code, error.message)
            return { ErrorinCatch: "Unknown Error" }
        }
    }
}

const googleAuth = async () => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log(user)
        const docRef = doc(db, "users", user.email)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.exists())
        if (!docSnap.exists()) {
            const userDoc = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                timestamp: serverTimestamp()
            }
            // console.log(userDoc)
            await setDoc(doc(db, "users", `${user.email}`), userDoc)
        }
        return {
            googleAuthSuccess: "Successfully Signed In"
        }

    } catch (error) {
        return {
            errorinCatch: error.message
        }
    }
}


const resetPassword = async (data) => {
    try {
        const docRef = doc(db, "users", data.email)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
            return { userNotExist: "User doesnot exists" }
        }
        await sendPasswordResetEmail(auth, data.email)
        return {
            passwordResetlink: "Password reset link send"
        }
    } catch (error) {
        return {
            errorinCatch: error.message
        }
    }
}

export { signup, signin, googleAuth, resetPassword }