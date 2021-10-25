import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-digits',
  templateUrl: './digits.component.html',
  styleUrls: ['./digits.component.scss']
})
export class DigitsComponent implements OnInit {
  @Input() time: any;
  @Input() blinking: boolean;

  constructor() { }

  ngOnInit(): void {}

}
