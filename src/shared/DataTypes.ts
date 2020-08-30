export type EntityType = 'user'

export type UserModel = {
    uid: string;
    first_name: string;
    last_name: string;
    type: 'seeker' | 'owner';
    bio: string;
    image: string;
    location: string;
}