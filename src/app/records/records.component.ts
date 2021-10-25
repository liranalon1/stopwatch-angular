import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  @Input() timeRecords: any[];
  @Output() updateGlobalStorage = new EventEmitter<string>();
  constructor() { }

  removeRecord(item): void {
    this.timeRecords.splice(item, 1);   //  remove each record from the timeRecords array
    this.updateGlobalStorage.emit();  //  call the parent function that update the records in the local storage
  }

  ngOnInit(): void {
  }

}
