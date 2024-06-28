import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {auth, storage} from "../firebase/firebase"
import { v4 } from "uuid"

const storeImages = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${auth.currentUser.uid}-${file.name}-${v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
            reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(new Error('Failed to get download URL: ' + error.message));
            });
        }
      );
    });
  };

export {storeImages}





    // console.log(data)
    // const imageList = []
    
    // for (let index = 0; index < data.length; index++) {
    //     imageList.push(data[index])
    // }
    // console.log(imageList)
    // const downloadURLs = []
    
    // imageList.map((image)=>{
    //     const imageRef = ref(storage, `images/${auth.currentUser.uid + image.name + v4()}`)
    //     // console.log(imageRef.bucket, imageRef.fullPath, imageRef.name)
    //     uploadBytes(imageRef, image)
    //     .then(()=>{
    //         console.log (`Image ${imageList.indexOf(image) + 1} uploaded`)
    //         return getDownloadURL(imageRef)
    //     })
    //     .then((url)=>{
    //         // console.log(url)
    //         downloadURLs.push(url)
    //     })
    //     .catch((error)=> {
    //         console.log(`Error in catch : ${error}`)
    //         return {errorinCatch : `Error in Catch ${error.message}`}
    //     })
    // })
// 
    // return {downloadURLs : downloadURLs}

// }


const deleteImages = (refrence)=>{
    try {
        
    } catch (error) {
        
    }
}

