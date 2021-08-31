import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Period } from '../../models/period.model';
import { ImageService } from '../../services/image/image.service';
import { PeriodService } from '../../services/period/period.service';

@Component({
  selector: 'app-period-details',
  templateUrl: './period-details.component.html',
  styleUrls: ['./period-details.component.scss'],
})
export class PeriodDetailsComponent implements OnInit {
  period: Period;
  images: any[];
  periodId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private periodService: PeriodService,
    private imageService: ImageService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.periodId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadPeriod(this.periodId);
    this.getPhotos(this.periodId);
  }

  loadPeriod(id: number): void {
    this.periodService.getPeriodById(id).subscribe(
      (response) => {
        this.period = response;
      },
      (responseError) => {}
    );
  }

  uploadPhoto(event, period: Period): void {
    const files = event.target.files;
    if (files) {
      const photo = files[0];
      const formData: FormData = new FormData();
      formData.append('photo', photo);
      this.imageService.save(period.id, formData).subscribe((response) => {
        this.getPhotos(period.id);
      });
    }
  }

  getPhotos(id: number): void {
    this.periodService.getImagesByPeriod(id).subscribe(
      (response) => {
        this.images = response;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
