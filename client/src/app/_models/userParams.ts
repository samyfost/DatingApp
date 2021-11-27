//import { User } from "./user";

import { User } from "./user";

// valjda ne puca zbog ovog gore
export class UserParams{
    gender:string;
    minAge=18;
    maxAge=99;
    pageNumber=1;
    pageSize=5;
    orderBy='lastActive';

    constructor(user:User){
        this.gender=user.gender ==='female' ? 'male' : 'female';
    }
}