import { UserModel } from "./DataTypes"
import { useState, useEffect } from "react"
import { auth } from './Firebase'
import { firestore } from "firebase"
import { UserCollection } from "./Collections"

export function useCurrentUser<T extends UserModel>() {
    const [currentUser, setCurrentUser] = useState<T | null | undefined>(undefined)
    useEffect(() => {
      return auth.onAuthStateChanged((user) => {
        if (user) {
          UserCollection.doc(user?.uid)
            .get()
            .then((ref) => {
              const data = (ref as firestore.DocumentSnapshot<T>).data()
              setCurrentUser({ uid: user.uid, ...data } as T || null)
            })
        } else {
          setCurrentUser(null)
        }
      })
    }, [])
    return currentUser
  }