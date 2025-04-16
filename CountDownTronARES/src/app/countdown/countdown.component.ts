import { afterNextRender, AfterRenderPhase, ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component,  } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {
  time = new Date();
  refreshIntervalId: any;
  isTimerRunning = false;
  isStart = true;
  timeSeted = {
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  };

  public startTimer() {
    console.log("time start");
    this.isStart = false;
    // this.refreshIntervalId = setInterval(() => {
    //   // console.log("int");
    //   if (
    //     this.time.getMonth() !== 0 ||
    //     this.time.getDate() !== 0 ||
    //     this.time.getHours() !== 0 ||
    //     this.time.getMinutes() !== 0 ||
    //     this.time.getSeconds() !== 0
    //   ) {
    //     this.time.setSeconds(this.time.getSeconds() - 1);
    //   }
    // }, 1000);
  //   afterNextRender(() => {
  //     this.refreshIntervalId = setInterval(() => {
  //     // console.log("int");
  //     if (
  //       this.time.getMonth() !== 0 ||
  //       this.time.getDate() !== 0 ||
  //       this.time.getHours() !== 0 ||
  //       this.time.getMinutes() !== 0 ||
  //       this.time.getSeconds() !== 0
  //     ) {
  //       this.time.setSeconds(this.time.getSeconds() - 1);
  //     }
  //   }, 1000);
  // }, {phase: AfterRenderPhase.Write});
    // console.log(this.applicationRef);
    // console.log(this.applicationRef.isStable);
    // console.log(this.applicationRef.isStable.pipe(first((isStable) => isStable)));
    
    
    this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      this.refreshIntervalId = setInterval(() => {
        if (
          this.time.getMonth() !== 0 ||
          this.time.getDate() !== 0 ||
          this.time.getHours() !== 0 ||
          this.time.getMinutes() !== 0 ||
          this.time.getSeconds() !== 0
        ) {
          this.time.setSeconds(this.time.getSeconds() - 1);
          this.cdr.detectChanges();
        }
      }, 1000);

    });
  }

  stopTimer() {
    clearInterval(this.refreshIntervalId);
  }

  resetTimer() {
    let today = new Date(Date.now());
    let tronRelease = new Date("10/10/2025");

    //simplify this
    this.timeSeted.month = tronRelease.getMonth() - today.getMonth();
    this.timeSeted.day = tronRelease.getDay() - today.getDay();
    this.timeSeted.hour = tronRelease.getHours() - today.getHours();
    this.timeSeted.minute = tronRelease.getMinutes() - today.getMinutes();
    this.timeSeted.second = tronRelease.getSeconds() - today.getSeconds();

    this.stopTimer();
    this.time.setMonth(this.timeSeted.month);
    this.time.setDate(this.timeSeted.day);
    this.time.setHours(this.timeSeted.hour);
    this.time.setMinutes(this.timeSeted.minute);
    this.time.setSeconds(this.timeSeted.second);
    this.isTimerRunning = false;
    this.isStart = true;
  }

  toggleTimer() {
    console.log("toggle");
    if (this.isTimerRunning) {
      this.stopTimer();
    } else {
      console.log("toggle start");
      this.startTimer();
    }
    this.isTimerRunning = !this.isTimerRunning;
  }

  setTimer(event: any) {
    this.timeSeted = event;
    this.resetTimer();
  }

  constructor(private applicationRef: ApplicationRef, private cdr: ChangeDetectorRef) {
    this.resetTimer();
    console.log("constructor");
    // afterNextRender(() => {
    //   this.startTimer();
    // } );
  }

  ngAfterInit(): void {
    console.log("afterinit");
    // this.startTimer();
  }

  ngOnInit(): void {
    console.log("ngoninit");
    // this.resetTimer();

    this.startTimer();
  }

}
