import { Component, SimpleChanges } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {

  date: Date = new Date("10/10/2025");
  dateNow: Date = new Date(Date.now());

  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(){
    this.days = Math.abs(this.date.getDay() - this.dateNow.getDay());
    this.hours = Math.abs(this.date.getHours() - this.dateNow.getHours());
    this.minutes = Math.abs(this.date.getMinutes() - this.dateNow.getMinutes());
    this.seconds = Math.abs(this.date.getSeconds() - this.dateNow.getSeconds());
    this.months = Math.abs(this.date.getMonth() - this.dateNow.getMonth());
    //this.startCountdown();
  }

  private countdownSubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("NGONCHANGE");
    if (changes['date'] && changes['date'].currentValue) {
      this.startCountdown();
    } else if (changes['date'] && !changes['date'].currentValue) {
      this.stopCountdown();
      this.resetTimer();
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  private startCountdown(): void {
    this.stopCountdown(); // Ensure any existing subscription is stopped

    console.log("START COUNTDOWN");

    this.countdownSubscription = interval(1000)
      .pipe(
        map(() => {
          const now = new Date().getTime();
          const distance = this.date.getTime() - now;

          //console.log("distance", distance);
          if (distance < 0) {
            this.stopCountdown();
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          return { days, hours, minutes, seconds };
        })
      )
      .subscribe(time => {
        this.days = time.days;
        this.hours = time.hours;
        this.minutes = time.minutes;
        this.seconds = time.seconds;
      });
  }

  private stopCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  private resetTimer(): void {
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
}
