
export class CreateHomeDto {
    street_address: string;
    state?: string;
    zip?: string;
    sqft?: number;
    beds?: number;
    baths?: number;
    list_price?: number;
}