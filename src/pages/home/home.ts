import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Store } from '../../models/store';
import { InfoPage } from '../info/info';
import { StoreProvider } from '../../providers/store/store';
import { AddStorePage } from '../add-store/add-store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stores: Store[];
  results: Store[];

  constructor(public navCtrl: NavController, private sp: StoreProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadStores();
  }

  loadStores(): void {
    this.sp.loadStores().subscribe(data => {
      this.stores = data;
      this.results = data;
    });
  }

  gotToStore(store: Store): void {
    this.navCtrl.push(InfoPage, {
      selectedStore: store
    });
  }

  add(): void {
    var addPage = this.modalCtrl.create(AddStorePage);
    addPage.onDidDismiss(() => {
      this.loadStores();
    });
    addPage.present();
  }

  onInput(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.results = this.stores.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.results = this.stores;
    }
  }

  onCancel(ev: any) {
    this.results = this.stores;
  }

}
