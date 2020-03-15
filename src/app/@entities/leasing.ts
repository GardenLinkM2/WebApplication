export interface Leasing {
    id : string;
    creation : number;
    time : number;
    begin : number;
    end : number;
    renew : boolean;
    state : string;
    garden : string;
    renter : string;
    owner : string;
}
