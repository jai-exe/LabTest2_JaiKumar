import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lat: number;
  lon: number;
  timestamp: number;
  locationList = [];
  keysList = [];
  result: string;

  setLoc = async ()=> {

    var loc = JSON.stringify([{
      timestamp: this.timestamp,
      lat: this.lat,
      lon: this.lon
    }])

    await Storage.set({key:this.timestamp.toString(), value:loc});
    console.log(this.timestamp);
    console.log(await Storage.get({key:this.timestamp.toString()}));

  }

  getLoc() {

    this.geolocation.getCurrentPosition().then((resp)=> {
      this.timestamp = resp.timestamp;
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.result = `{"timestamp":${this.timestamp},"latitude":${this.lat},"longitude":${this.lon}}`;
      this.keysList.push(this.timestamp.toString());
      this.locationList.push(JSON.parse(this.result));
      this.setLoc();
    }).catch((error) => {
      console.log("Error: ", error)
    });

  }

  removeLoc(index) {

    var removeLocation = async () => {
      await Storage.remove({key: index})
    }
    this.locationList.splice(index, 1);
    this.keysList.splice(index, 1);
    removeLocation();

  }


  constructor(
    private geolocation: Geolocation
  ) {
    this.getLoc();
  }

  

}
