import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song';

@Injectable({
    providedIn: 'root'
})

export class DataService{

    private songsUrl = 'http://localhost:5002/api/song';
    orderId: number;

    constructor(private http: HttpClient) { }

    getSongs(): Observable<Song[]> {
        return this.http.get<Song[]>(this.songsUrl);
    }

    getCountries(songs: Song[]) {
        let countriesFilter: Array<string> = []
        for (let i = 0; i < songs.length; i++) {
            countriesFilter.push(songs[i].vCountry);
        }
        countriesFilter.sort();
        countriesFilter = countriesFilter.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
                return elem;
            }
        })
        return countriesFilter;
    }

    getYears(songs: Song[]) {
        let yearsFilter: Array<string> = [];
        let years: Array<string> = [];
        let lastYear: string = "";
        for (let i = 0; i < songs.length; i++) {
            years.push(songs[i].vReleaseYear);
        }
        years.sort();
        for (let i = 0; i < songs.length; i++) {
          years[i] = years[i].substring(0, 3) + "0";
          if (i == songs.length - 1) {
            lastYear = parseInt(years[i].substring(0, 3)) + 1 + "0";
          }
        }
        years = years.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
                return elem;
            }
        })
        years.push(lastYear);
        for (let i = 1; i< years.length; i++) {
          yearsFilter.push(years[i-1] + "-" + years[i]);
        }
        return yearsFilter;
    }

    getStyles(songs: Song[]) {
        let stylesFilter: Array<string> = [];
        for (let i=0; i < songs.length; i++) {
            let style = songs[i].vMusicalStyle;
            let rowArray: Array<string> = style.split(", ");
            for (let j = 0; j < rowArray.length; j++) {
                stylesFilter.push(rowArray[j]);
            }
        }
        stylesFilter.sort();
        stylesFilter = stylesFilter.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
                return elem;
            }
        })
        return stylesFilter;
    }
}
