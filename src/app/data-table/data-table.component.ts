import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, Reading } from './data-table-datasource';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Reading>;

  @Output() clickedBox = new EventEmitter<string>();

  selectBox(box: string) {
    console.log(box)
    this.clickedBox.emit(box)
  }
  dataSource: DataTableDataSource;
  
  displayedColumns = ['id', 'name','reading', 'unit', 'reading_ts', 'longitude', 'latitude',  'sensor_type', 'range_l', 'range_u', 'box_id'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
