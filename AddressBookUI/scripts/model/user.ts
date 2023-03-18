export class User {
    id : number;
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;
    description: string;
    constructor(args:User) {
        this.id=args.id;
        this.name = args.name;
        this.email = args.email;
        this.mobile =args. mobile;
        this.landline = args.landline;
        this.website = args.website;
        this.address = args.address;
        this.description = args.description
    }
}