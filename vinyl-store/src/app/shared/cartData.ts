export class CartData {
    vAlbum: string;
    vPrice: number;
    quantity: number;
    total: number;

    constructor(vAlbum: string, vPrice: number, quantity: number, total: number) {
        this.vAlbum = vAlbum;
        this.vPrice = vPrice;
        this.quantity = quantity;
        this.total = total;
    }
}