export class Cart {
    recordId: number;
    cartId: string;
    songvId: number;
    quantity: number;
    dateCreated: string;

    constructor(recordId: number, cartId: string, songvId: number, quantity: number, dateCreated: string) {
        this.recordId = recordId;
        this.cartId = cartId;
        this.songvId = songvId;
        this.quantity = quantity;
        this.dateCreated = dateCreated;
    }
}