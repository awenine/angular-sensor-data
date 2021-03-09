import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

declare var require: any 

export interface Reading {
  id: string;
  box_id: string;
  sensor_type: string;
  name: string;
  range_l: number;
  range_u: number;
  longitude: number;
  latitude: number;
  reading: number;
  unit: string;
  reading_ts: string;
}

//TODO pass data down from parent?
const SENSOR_DATA: Reading[] = require('../../../data/sensor_readings.json');

export class DataTableDataSource extends DataSource<Reading> {

  data: Reading[] = SENSOR_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<Reading[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: Reading[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Reading[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'reading_ts': return compare(a.reading_ts, b.reading_ts, isAsc);
        case 'sensor_type': return compare(a.sensor_type, b.sensor_type, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
