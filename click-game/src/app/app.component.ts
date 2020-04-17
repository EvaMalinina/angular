import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Click-game';
  name = 'Mate';
  clickNumber = 0;
  time: number = 10;
  interval;
  records = [];

  showGameTemplate() {
    document.getElementById('content').style.display = 'flex';
  }

  showRecordsTemplate() {
    document.getElementById('records').style.display = 'flex';
  }

  hideMainScreen() {
    document.getElementById('main').style.display = 'none';
  }

  getName() {
    this.name = prompt('Tell me your name please');
    if(true) {
      this.showGameTemplate();
      this.showRecordsTemplate();
      this.hideMainScreen();
    }
  }

  startTimer() {
    let btnStart = document.getElementById('btn-start');
    let btnClick = document.getElementById('btn-click');
    btnStart.style.display = 'none';
    btnClick.style.display = 'block';

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
          console.log(this.records)

          this.clickNumber = 0;
          btnStart.style.display = 'block';
          btnClick.style.display = 'none';
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
