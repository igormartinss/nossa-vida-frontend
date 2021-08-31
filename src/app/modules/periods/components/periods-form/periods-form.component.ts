import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Period } from '../../models/period.model';
import { PeriodService } from '../../services/period/period.service';

@Component({
  selector: 'app-periods-form',
  templateUrl: './periods-form.component.html',
  styleUrls: ['./periods-form.component.scss'],
})
export class PeriodsFormComponent implements OnInit {
  period: Period;
  form: FormGroup;
  id: number;

  constructor(
    private router: Router,
    private periodService: PeriodService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.period = new Period();
  }

  ngOnInit(): void {
    this.initiateForm();
    this.isEdit();
  }

  onSubmit() {
    const formValues = this.form.value;
    this.period = new Period(
      this.period.id,
      formValues.title,
      formValues.startDate,
      formValues.endDate,
      formValues.description
    );
    this.periodService.save(this.period).subscribe(
      (response) => {
        this.period = response;
        this.router.navigate(['period/details'], {
          queryParams: { id: this.period.id },
        });
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  initiateForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  isEdit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.periodService.getPeriodById(this.id).subscribe(
          (response) => {
            this.period = response;
            this.form.patchValue({
              title: this.period.title,
              startDate: this.period.startDate,
              endDate: this.period.endDate,
              description: this.period.description,
            });
          },
          (errorResponse) => {
            this.period = new Period();
          }
        );
      }
    });
  }

  delete(id: number) {
    this.periodService.delete(id).subscribe((response) => {
      this.router.navigate(['period/list']);
    });
  }
}
