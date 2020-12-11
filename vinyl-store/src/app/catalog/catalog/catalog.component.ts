import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Song } from '../../shared/song';
import { Cart } from '../../shared/cart';
import { Title } from '@angular/platform-browser';
import { CartService } from '../../shared/cart.service';
import notify from 'devextreme/ui/notify';

@Pipe({
  name: 'highlight'
})

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, PipeTransform{

  loadingData: boolean = true;
  // список всех песен
  songs: Song[] = [];
  // список отобранных песен
  selectedSongs: Song[];
  // страницы
  pageOfItems: Array<any>;
  // списки всех годов/стран/стилей для фильтров
  yearsFilter: string[] = [];
  countriesFilter: string[] = [];
  stylesFilter: string[] = [];
  // списки отобранных годов/стран/стилей из фильтров
  selectedCountries: string[] = [];
  selectedYears: string[] = [];
  selectedStyles: string[] = [];
  // выводит количество отобранных песен
  foundElementsCount: number = 0;
  // текст поиска
  searchText: string = "";
  // цены
  minPrice: number = 0;
  maxPrice: number = 0;
  cookieValue: string = "";
  cart: Cart[] = [];

  constructor(private dataService: DataService, private titleService: Title, private cartService: CartService) {
    titleService.setTitle("Catalog");
  }

  ngOnInit() {
    this.dataService.getSongs().subscribe(songs => {
      this.songs = songs;
      this.selectedSongs = this.songs;
      this.findFilterValues();
      this.foundElementsCount = this.selectedSongs.length;
    });
    this.loadingData = false;
  }

  transform(text: string, search: string): any {
    return search ? text.replace(new RegExp(search, 'i'), `<span class="highlight">${search}</span>`) : text;
  }

  // заполнение фильтров
  findFilterValues() {
    this.yearsFilter = this.dataService.getYears(this.songs);
    this.countriesFilter = this.dataService.getCountries(this.songs);
    this.stylesFilter = this.dataService.getStyles(this.songs);
  }

  // возвращает список отобранных песен по ценам
  pricesValueChanged() {
    let selectedSongs: any[] = [];
    this.songs.forEach((item, index) => {
        if (item.vPrice >= this.minPrice && item.vPrice <= this.maxPrice) {
          selectedSongs.push(item);
        }
    });
    return selectedSongs;
  }

  // отбор по цене
  onValueChanged(e) {;
    this.minPrice = e.value[0];
    this.maxPrice = e.value[1];
    let allSelectedSongs = this.getAllSongs();
    this.foundElementsCount = allSelectedSongs.length;
    this.selectedSongs = allSelectedSongs;
  }

  // возвращает список отобранных песен по годам
  yearsValueChanged() {
    if (this.selectedYears.length == 0) {
      return this.songs;
    }
    let selectedSongs: any[] = [];
    this.songs.forEach((item) => {
      this.selectedYears.forEach((y) => {
        let minYear = y.substring(0, 4);
        let maxYear = y.substring(5, 9);
        if (item.vReleaseYear >= minYear && item.vReleaseYear <= maxYear) {
          selectedSongs.push(item);
        }
      });
    });
    return selectedSongs;
  }
  
  // возвращает список отобранных песен по странам
  countriesValueChanged() {
    if (this.selectedCountries.length == 0) {
      return this.songs;
    }
    let selectedSongs: any[] = [];
    this.songs.forEach((item) => {
      this.selectedCountries.forEach((c) => {
        if (item.vCountry == c) {
          selectedSongs.push(item);
        }
      });
    });
    return selectedSongs;
  }

  // возвращает список отобранных песен по стилям
  stylesValueChanged() {
    if (this.selectedStyles.length == 0) {
      return this.songs;
    }
    let selectedSongs: any[] = [];
    let keepGoing = true;
    this.songs.forEach((item) => {
      keepGoing = true;
      // стили одной песни
      let rowArray: Array<string> = item.vMusicalStyle.split(", ");
      rowArray.forEach((r) => {
        this.selectedStyles.forEach((s) => {
          if(keepGoing) {
            if (r == s) {
              selectedSongs.push(item);
              keepGoing = false;
            }
          }
        });
      });
    });
    return selectedSongs;
  }

  // возвращает список отобранных песен по поиску
  searchValueChanged(val1) {
    let val = val1.toLowerCase();
    this.searchText = val;
    let selectedSongs: any[] = [];
    this.songs.forEach((item, index) => {
      if (item.vCountry.toLowerCase().indexOf(val) != -1 || 
      item.vArtist.toLowerCase().indexOf(val) != -1 ||
      item.vAlbum.toLowerCase().indexOf(val) != -1 ||
      item.vReleaseYear.toLowerCase().indexOf(val) != -1 ||
      item.vMusicalStyle.toLowerCase().indexOf(val) != -1) {
        selectedSongs.push(item);
      }
    });
    return selectedSongs;
  }

  // поиск
  textBoxValueChange(e) {
    let allSelectedSongs = this.getAllSongs();
    this.foundElementsCount = allSelectedSongs.length;
    this.selectedSongs = allSelectedSongs;
  }

  // применение всех фильтров
  getAllSongs() {
    let selectedSongsByCountries: any[] = this.countriesValueChanged();
    let selectedSongsByYears: any[] = this.yearsValueChanged();
    let selectedSongsByStyles: any[] = this.stylesValueChanged();
    let selectedSongsBySearch: any[] = this.searchValueChanged(this.searchText);
    let selectedSongsByPrices: any[] = this.pricesValueChanged();
    let allSelectedSongs = selectedSongsByCountries.filter(function(v) {
      return selectedSongsByYears.indexOf(v) > -1;
    }).filter(function(v) {
      return selectedSongsByStyles.indexOf(v) > -1;
    }).filter(function(v) {
      return selectedSongsBySearch.indexOf(v) > -1;
    }).filter(function(v) {
      return selectedSongsByPrices.indexOf(v) > -1;
    })
    return allSelectedSongs;
  }

  // применение фильтров
  onApplyClicked() {
    let allSelectedSongs = this.getAllSongs();
    this.foundElementsCount = allSelectedSongs.length;
    this.selectedSongs = allSelectedSongs;
  }

  onResetClicked() {
    this.selectedCountries = [];
    this.selectedYears = [];
    this.selectedStyles = [];
    this.searchText = "";
    this.selectedSongs = this.songs;
    this.foundElementsCount = this.selectedSongs.length;
  }

  onAddToCartClicked(song){
    this.cookieValue = this.cartService.getCookie();
    this.cartService.addToCart(this.cookieValue, song.vId).subscribe(cart => {
      this.cart = cart;
    });
    notify(`Album '${song.vAlbum}' was successflly added to cart!`);
  }
  
  // обновление количества страниц от количества песен
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    // скроллинг наверх
    scrollTo(0, 0);
  }
}