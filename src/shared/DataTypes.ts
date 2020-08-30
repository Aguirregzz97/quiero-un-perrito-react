export type EntityType = 'user';

export type UserModel = {
    uid: string;
    first_name: string;
    last_name: string;
    type: 'seeker' | 'owner';
    bio: string;
    image: string;
    location: string;
};

export interface Dog {
    uid: string;
    name: string;
    owner_id: string;
    bio: string;
    images: Array<string>;
    size: 'small' | 'medium' | 'large';
    breed: string;
    age: number; // months
}

export interface SeenDogs {
    seeker_id: string;
    seen_dogs: Array<string>;
    datetime: number; // secs since epoch
}

export type AdoptionRequest = {
    reason_description: string,
 }

export type AdoptionRequestModel = {
    adoption_request: AdoptionRequest,
    dog: Dog,
    seeker: UserModel,
}