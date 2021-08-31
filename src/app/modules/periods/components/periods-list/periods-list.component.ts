import { Component, OnInit } from '@angular/core';
import { Period } from '../../models/period.model';
import { PeriodService } from '../../services/period/period.service';

@Component({
  selector: 'app-periods-list',
  templateUrl: './periods-list.component.html',
  styleUrls: ['./periods-list.component.scss'],
})
export class PeriodsListComponent implements OnInit {
  periods: Period[];

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.loadPeriods();
  }

  loadPeriods(): void {
    this.periodService.getPeriods().subscribe(
      (response) => {
        this.periods = response;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  setImage(image: any[]): string {
    return `data:image/png;base64,${image}`;
  }
}
