import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() receivedRecords: any[]



}
