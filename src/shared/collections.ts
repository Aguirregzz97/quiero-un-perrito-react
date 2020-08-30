import { firestore } from './Firebase'

export const UserCollection = firestore.collection('userProfiles')
export const SessionCollection = firestore.collection('sessions')