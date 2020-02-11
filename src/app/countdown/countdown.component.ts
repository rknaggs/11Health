import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  title = 'PracticalTest';
  timezoneIdentifier = '';
  timezoneAbbr = '';
  taxTime = 'April 14 2020 23:59:59 GMT+0200';
  time = { days: '--', hours: '--', minutes: '--', seconds: '--' };
  zipCodeEntry = '';
  showModalBox = false;
  mdlSampleIsOpen = false;
  errorMsg = '';

  @ViewChild('zipCode', { static: false }) zipCode: ElementRef;


  constructor(private apiService: ApiService) {
  }


  ngOnInit() {
  }


  openModal(open: boolean) {
    this.mdlSampleIsOpen = open;
  }


  getTimeZone() {

    this.apiService.getTimeZone(this.zipCode.nativeElement.value).subscribe(
      result => {
        // Handle result
        try {
          this.timezoneIdentifier = result.timezone.timezone_identifier;
          this.timezoneAbbr = result.timezone.timezone_abbr;

          const numbers = interval(1000);
          numbers.subscribe(
            (count => {
              this.time = this.countDown();
            })
          );

        } catch (event) {
          this.zipCode.nativeElement.value = '';
          this.zipCodeEntry = '';
          this.errorMsg = 'Please enter a valid Zipcode';
          this.openModal(true);
        }


      },
      error => {
        this.zipCode.nativeElement.value = '';
        this.errorMsg = 'An Internal error occured';
        this.openModal(true);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }



  countDown() {
    const newDate = '' + new Date().toLocaleString("en-US", { timeZone: this.timezoneIdentifier });
    const t = Date.parse(this.taxTime) - Date.parse(newDate);
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t.toString(),
      'days': days.toString(),
      'hours': hours.toString(),
      'minutes': minutes.toString(),
      'seconds': seconds.toString()
    };
  }
}
