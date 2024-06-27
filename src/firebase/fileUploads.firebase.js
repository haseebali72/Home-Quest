import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {auth, storage} from "../firebase/firebase"
import { v4 } from "uuid"

const uploadImages = async(data)=>{
    console.log(data)
    const imageList = []
    
    for (let index = 0; index < data.length; index++) {
        imageList.push(data[index])
    }

    const downloadURLs = []
    
    imageList.map((image)=>{
        const imageRef = ref(storage, `images/${auth.currentUser.uid + image.name + v4()}`)
        // console.log(imageRef.bucket, imageRef.fullPath, imageRef.name)
        uploadBytes(imageRef, image)
        .then(()=>{
            console.log (`Image ${imageList.indexOf(image) + 1} uploaded`)
            return getDownloadURL(imageRef)
        })
        .then((url)=>{
            console.log(url)
            downloadURLs.push(url)
        })
        .catch((error)=> {
            console.log(`Error in catch : ${error}`)
            return {errorinCatch : `Error in Catch ${error.message}`}
        })
    })

    return {downloadURLs : downloadURLs}
}


const deleteImages = (refrence)=>{
    try {
        
    } catch (error) {
        
    }
}

export {uploadImages}