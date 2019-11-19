import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Store } from '../../models/store';
import { StoreProvider } from '../../providers/store/store';
import { MapProvider } from '../../providers/map/map';

/**
 * Generated class for the AddStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-store',
  templateUrl: 'add-store.html',
})
export class AddStorePage {

  store: Store = {
    name: "",
    address: "",
    category: "",
    location: null,
    comments: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, private sp: StoreProvider, private map: MapProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStorePage');
  }

  add(): void {
    if (this.store.name == "" || this.store.address == "" || this.store.category == "") {
      const alert = this.alertCtrl.create({
        title: 'Information missing',
        subTitle: 'Please fill in all the fields',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      this.sp.uploadStore(this.store).subscribe(
        data => this.viewCtrl.dismiss()
      );
    }
  }

  geocode(): void {
    this.map.geocode(this.store.address).subscribe(data => {
      this.store.address = data.address;
      this.store.location = data.location;
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
