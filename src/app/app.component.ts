import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  counterIsActive: boolean = false;
  counter: number;
  timerRef;

  dataStorageIsEmpty;

  time: any = {
    minutes: '00',
    seconds: '00',
    milliseconds: '00'
  }

  blinking: boolean = false;

  timeRecords: any = [];

  dataStorage: any = (localStorage.getItem('dataStorage')) ? JSON.parse(localStorage.getItem('dataStorage')):{
    lastTimerStorage: [],
    lastCounterStorage: [],
    recordsStorage: []
  };

  startTimer(): void {
    this.counterIsActive = !this.counterIsActive;
    if (this.counterIsActive) {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.time.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.time.minutes = Math.floor(this.counter / 60000);
        this.time.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (Number(this.time.minutes) < 10) {
          this.time.minutes = '0' + this.time.minutes;
        } else {
          this.time.minutes = '' + this.time.minutes;
        }
        
        //  blinking condition
        if (Number(++this.time.milliseconds) === 100) {
          this.blinking = true;
        } else if (Number(this.time.milliseconds) === 20) {
          this.blinking = false;
        }else{}

        if (Number(this.time.milliseconds) < 10) {
          this.time.milliseconds = '0' + this.time.milliseconds;
        } else {
          this.time.milliseconds = '' + this.time.milliseconds;
        }
        
        if (Number(this.time.seconds) < 10) {
          this.time.seconds = '0' + this.time.seconds;
        } else {
          this.time.seconds = '' + this.time.seconds;
        }
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  addCurrentTime(): void {
    let recordTime = {
      minutes: this.time.minutes,
      seconds: this.time.seconds,
      milliseconds: this.time.milliseconds
    };
    this.timeRecords.push(recordTime);
    this.updatedStorage();
  }

  eraseTimer(): void {
    this.counterIsActive = false;
    clearInterval(this.timerRef);
    this.timeRecords = [];
    this.time.minutes = '00';
    this.time.seconds = '00';
    this.time.milliseconds = '00';
    this.counter = undefined;
    localStorage.clear();
    
    this.dataStorageIsEmpty = true;
  }

  updatedStorage(): void {
    this.dataStorage.recordsStorage = this.timeRecords;
    this.dataStorage.lastTimerStorage = [];
    this.dataStorage.lastCounterStorage = this.counter;
    this.dataStorage.lastTimerStorage.push(this.timeRecords[this.timeRecords.length-1]);
    localStorage.setItem('dataStorage', JSON.stringify(this.dataStorage));
  }

  renderMyTimer(): void {
    if (!this.dataStorage.lastTimerStorage.length && !this.dataStorage.recordsStorage.length) {
      this.dataStorageIsEmpty = true;
      return;  
    }

    this.dataStorageIsEmpty = false;
    this.timeRecords = this.dataStorage.recordsStorage;                     //  update the time Records list from local storage
    this.time.minutes = this.dataStorage.lastTimerStorage[0].minutes;            //  last minutes from local storage
    this.time.seconds = this.dataStorage.lastTimerStorage[0].seconds;            //  last seconds from local storage
    this.time.milliseconds = this.dataStorage.lastTimerStorage[0].milliseconds; //  last milliseconds from local storage
    this.counter = this.dataStorage.lastCounterStorage;                   //  last counter from local storage
  }

  ngOnInit() {
    this.renderMyTimer();
  }

  ngOnDestroy() {
   
  }

}
