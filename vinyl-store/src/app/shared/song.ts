export class Song {
    vId: number;
    vArtist: string;
    vAlbum: string;
    vBarcode: string;
    vCatalogNo: string;
    vLastReleaseYear: string;
    vReleaseYear: string;
    vFormat: string;
    vLabel: string;
    vCountry: string;
    vTop: string;
    vState: string;
    vMusicalStyle: string;
    vMarks: string;
    vPrice: number;

    constructor(vId: number, vArtist: string, vAlbum: string, vBarcode: string, vCatalogNo: string,
        vLastReleaseYear: string, vReleaseYear: string, vFormat: string, vLabel:string, vCountry: string,
        vTop:string, vState: string, vMusicalStyle: string, vMarks: string, vPrice: number) {
        this.vId = vId;
        this.vArtist = vArtist;
        this.vAlbum = vAlbum;
        this.vBarcode = vBarcode;
        this.vCatalogNo = vCatalogNo;
        this.vLastReleaseYear = vLastReleaseYear;
        this.vReleaseYear = vReleaseYear;
        this.vFormat = vFormat;
        this.vLabel = vLabel;
        this.vCountry = vCountry;
        this.vTop = vTop;
        this.vState = vState;
        this.vMusicalStyle = vMusicalStyle;
        this.vMarks = vMarks;
        this.vPrice = vPrice;
    }
}