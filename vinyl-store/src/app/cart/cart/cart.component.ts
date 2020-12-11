import { Component, OnInit, HostListener } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Cart } from '../../shared/cart';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/data.service';
import { Song } from '../../shared/song';
import { CartData } from '../../shared/cartData';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart: Cart[] = [];
  songs: Song[] = [];
  cartData: CartData[] = [];
  totalAmount: number = 0;
  cookieValue: string = "";
  pageSize: number = 14;
  orderId: number;
  showButton: boolean = false;

  constructor(private cartService: CartService, private titleService: Title, private dataService: DataService,
    private authService: AuthService) {
    titleService.setTitle("Cart");
  }

  ngOnInit() {
    this.cookieValue = this.cartService.getCookie();
    this.cartService.getCartById(this.cookieValue).subscribe(cart => {
      this.cart = cart;
      this.dataService.getSongs().subscribe(songs => {
        this.songs = songs;
        this.cartData = this.cartService.getCartData(cart, songs);
      });
    });
    this.pageSize = this.setDataGridPageSize();
    if (this.authService.username != "") {
      this.showButton = true;
    }
  }

  // очищение корзины
  onClearCartClicked() {
    if (this.cartData.length > 0) {
      this.cartService.EmptyCart(this.cookieValue).subscribe(
        () => console.log(`cart with cookieValue = ${this.cookieValue} is deleted`),
        (err) => console.log(err)
      );
      this.cartData = [];
      notify("Your shopping cart was successflly cleared!");
    }
    else {
      notify("Your shopping cart is empty!");
    }
  }

  onCreateOrderClicked() {
    if (this.cartData.length == 0) {
      notify("Add items before creating an order!");
    }
    else {
      this.cartService.CreateOrder(this.cookieValue, this.authService.username).subscribe(orderId => {
        this.orderId = orderId;
      });
      this.cartData = [];
      this.setData();
      notify("Your order was successfully processed!");
    }
  }

  setData() {
    this.dataService.orderId = this.orderId;
  }

  // изменение количества в таблице
  onQuantityChanged(newData, value, currentRowData) {
    newData.quantity = value;
    newData.total = currentRowData.vPrice * value;
  }

  // запрос к базе с изменением количества или удалением строки
  removeFromCart(vAlbum, quantity) {
    let songId = this.cartService.getSongIdByAlbum(this.songs, vAlbum);
    this.cartService.removeFromCart(this.cookieValue, songId, quantity).subscribe(
      () => console.log(`song with id = ${songId} is deleted from database`),
      (err) => console.log(err)
    );
  }

  // изменение количества в базе
  onRowUpdated(e) {
    this.removeFromCart(e.data.vAlbum, e.data.quantity);
  }

  // удаление строки
  onRowRemoved(e) {
    this.removeFromCart(e.data.vAlbum, 0);
    notify(`Album '${e.data.vAlbum}' was successflly deleted!`);
  }

  @HostListener('window:resize', ['$event'])
  setDataGridPageSize() {  
    var amountOfRows = 0;  
    var innerPageHeight = window.innerHeight; 
    var rowHeight = 32.67;
    amountOfRows = Math.floor((innerPageHeight - 290) / rowHeight);
    return amountOfRows;
  }
}