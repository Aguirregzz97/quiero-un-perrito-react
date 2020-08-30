import { firestore } from './Firebase'

export const UserCollection = firestore.collection('users')
export const SessionCollection = firestore.collection('sessions')