import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Store } from '../../models/store';
declare var mapboxgl: any;
import { AddCommentPage } from '../add-comment/add-comment';
import { StoreProvider } from '../../providers/store/store';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  store: Store

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private sp: StoreProvider) {
    this.store = this.navParams.get('selectedStore');
  }

  ionViewDidLoad() {
    this.store = this.navParams.get('selectedStore');
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2h5bm90YmVhbGlvbiIsImEiOiJjam83OXprNXMwdHMxM3BubDlrb3R2cG11In0.ahWXbROpF9dHYaQK2TAv2Q';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 15,
      center: this.store.location
    });
    var marker = new mapboxgl.Marker()
      .setLngLat(this.store.location)
      .addTo(map);
  }

  addComment(): void {
    var addComment = this.modalCtrl.create(AddCommentPage);
    addComment.onDidDismiss(comment => {
      if (comment) {
        if (!this.store.comments) this.store.comments = [];
        this.store.comments.push(comment);
        this.sp.uploadStore(this.store).subscribe();
      }
    });
    addComment.present();
  }

}
