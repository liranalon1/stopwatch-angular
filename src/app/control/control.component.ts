import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  @Input() counterIsActive: boolean;
  @Output() start = new EventEmitter<string>();
  @Output() recordTime = new EventEmitter<string>();
  @Output() erase = new EventEmitter<string>();

  constructor() { }

  startCounting(): void {
    this.start.emit();  //  call the parent function that start the timer
  }

  getCurrentTime(): void {
    this.recordTime.emit();  //  call the parent function that start recordTime timer
  }

  eraseTimer(): void {
    this.erase.emit();  //  call the parent function that start recordTime timer
  }

  ngOnInit(): void {
  }

}
