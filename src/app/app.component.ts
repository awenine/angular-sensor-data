import { Component } from '@angular/core';

declare var require: any 

export interface Reading {
  id: String;
  box_id: String;
  sensor_type: String;
  name: String;
  range_l: Number;
  range_u: Number;
  longitude: Number;
  latitude: Number;
  reading: Number;
  unit: String;
  reading_ts: String;
}

const READING_DATA: Reading[] = require('../../data/sensor_readings.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sensor-readings';
  public box = "Box-A1-O3";
  public dataSource = READING_DATA;
  public data = READING_DATA.filter(d => d.id === this.box);

  selectBox(boxId){
    this.box = boxId;
    this.data = READING_DATA.filter(d => d.id === boxId);
    console.log(boxId, 'selected')
  }
}
