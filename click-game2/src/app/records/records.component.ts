import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecordsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  @Input() receivedRecords: any[]
}
