
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const isUser = async () => {
    try {
        const user = auth.currentUser
        if (user) {

            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            return {
                displayName: user.displayName,
                email: user.email,
                profileImage: user.photoURL,
                bio: userSnap.data()?.bio || '',
                gender: userSnap.data()?.gender || '',
            }

        } else {
            throw new Error('user not logged in')
        }
    } catch (error) {
        throw error
    }
}

const signupUser = async (email: string, password: string, fullName: string) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user

        await updateProfile(user, {
            displayName: fullName
        })

        return user
    } catch (error) {
        throw error // return error with error.message
    }
}

const loginUser = async (email: string, password: string) => {
    try {
       const userCredentials = await signInWithEmailAndPassword(auth, email, password);
       const user = userCredentials.user

       return user
    } catch (error) {
        throw error // return error with error.message
    }
}

const updateUser = async (fullName: string, bio: string, profileImage: string, gender: string) => {
    try {
        const user = auth.currentUser
        if (user) {
            // update firebase auth profile (displayname, photo only)
            const profileUpdates: {displayName?: string, photoUrl?: string} = {  } 

            if (fullName) profileUpdates.displayName = fullName
            if (profileImage) profileUpdates.photoUrl = profileImage

            await updateProfile(user, profileUpdates)

            // update firestore (bio and gender)

            const docUpdates: {bio?: string, gender?: string} = {}
            
            if (bio) docUpdates.bio = bio
            if (gender) docUpdates.gender = gender

            const userRef = doc(db, 'users', user.uid); // userref we define the place where the data should be added, it creates an empty doc with uid inside users folder
            await setDoc(userRef, docUpdates) // update the /users/user.uid doc by adding bio and gender
            
            return user
        } else {
            throw new Error('user not signed in')
        }
    } catch (error) {
        throw error // return error with error.message
    }
}

const logoutUser = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        throw error // return error with error.message
    }
}

const createPost = async (title: string, description: string, tags: [], mediaUrl: string) => {
    try {
        // tags and mediaUrl are optional
    
        const postRef = collection(db, 'posts') // doc to get doc of specific id
        await addDoc(postRef, {
            title,
            description,
            tags,
            mediaUrl
        })
    } catch (error) {
        throw error
    }
}

export {isUser, signupUser, loginUser, updateUser, logoutUser, createPost};