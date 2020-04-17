import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'Click-game';
  name: string = 'Mate';
  clickNumber: number = 0;
  time: number = 10;
  interval;
  records: any[] = [];
  show: boolean = false;
  visibleBtn: boolean = false;

  showGameTemplate() {
    this.show = !this.show;
  }

  showClickBtn() {
    this.visibleBtn = !this.visibleBtn;
  }

  getName() {
    this.name = prompt('Tell me your name please');
    if(this.name) {
      this.showGameTemplate();
    }
  }

  changeName() {
    this.name = prompt('Tell me your name please');
  }

  startTimer() {
    this.showClickBtn();

    this.interval = setInterval(() => {
      if( this.time > 0 ) {
        this.time--;
        if( this.time === 0 ) {
          clearInterval( this.interval );

          if ( this.clickNumber === 0 ) {
            alert(`Sorry ${this.name}, you did not click a single time.
            Don't be a looser. Try 1 more time`);
          } else if ( this.clickNumber <= 30 && this.clickNumber > 0 ) {
            alert(`Congratulations ${this.name}, you clicked ${this.clickNumber} times.
            Your score is so so...`);
          } else if ( this.clickNumber <= 70 && this.clickNumber > 30 ){
            alert(`Congratulations ${this.name}, you clicked ${this.clickNumber} times.
            Your score is good.`);
          } else {
            alert(`Congratulations ${this.name}, you clicked ${this.clickNumber} times.
            Your score is excellent. You are maestro!`);
          }

          let user = {
            name: this.name,
            score: this.clickNumber
          }

          this.records.push(user);

          this.clickNumber = 0;
          this.showClickBtn();
        }
      } else {
        this.time = 10;
      }
    },1000)
  }

  countClick() {
    if (this.time > 0) {
      this.clickNumber++
    } else {
      this.clickNumber = 0
    }
  }
}
