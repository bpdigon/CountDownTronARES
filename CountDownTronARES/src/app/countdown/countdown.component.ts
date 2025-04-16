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
  tronRelease = new Date("10/10/2025");

  interval: any;
  
  public startTimer() {
    this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      this.interval = setInterval(() => {
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

  ngOnDestory() {
    clearInterval(this.interval);
    //add easter egg to users here
  }

  resetTimer() {
    let today = new Date(Date.now());

    clearInterval(this.interval);
    this.time.setMonth(this.tronRelease.getMonth() - today.getMonth());
    this.time.setDate(this.tronRelease.getDay() - today.getDay());
    this.time.setHours(this.tronRelease.getHours() - today.getHours());
    this.time.setMinutes(this.tronRelease.getMinutes() - today.getMinutes());
    this.time.setSeconds(this.tronRelease.getSeconds() - today.getSeconds());
  }

  constructor(private applicationRef: ApplicationRef, private cdr: ChangeDetectorRef) {
    this.resetTimer();
  }

  ngOnInit(): void {
    this.startTimer();
    //add easter egg to users here
  }

}
