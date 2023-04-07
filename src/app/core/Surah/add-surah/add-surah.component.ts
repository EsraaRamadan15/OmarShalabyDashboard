import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterNotifierService } from 'src/app/shared/toaster-notifier.service';
import { Surah } from '../../models/surah';
import { SurahService } from '../services/surah-service.service';

@Component({
  selector: 'app-add-surah',
  templateUrl: './add-surah.component.html',
  styleUrls: ['./add-surah.component.css'],
})
export class AddSurahComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});
  surah = {} as Surah;

  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  isAddMode!: boolean;
  Subscription: Subscription = new Subscription();

  editMode = false;

  constructor(
    private categoryService: SurahService,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private notificationService: ToasterNotifierService
  ) {}

  ngOnInit(): void {
    console.log(this.routeActivate.snapshot.url[0].path);
    if (this.routeActivate.snapshot.url[0].path == 'edit-category') {
      this.editMode = !this.editMode;
    }
    this.surah = {
      id: this.routeActivate.snapshot.paramMap.get('id'),
      nameEn: this.routeActivate.snapshot.paramMap.get('nameEn'),
      nameAr: this.routeActivate.snapshot.paramMap.get('nameAr'),
      sortOrder: this.routeActivate.snapshot.paramMap.get('sortOrder'),
    };

    this.initFrom();
  }
  initFrom() {
    this.addForm = new FormGroup({
      nameEn: new FormControl(this.surah.nameEn, [Validators.required]),

      nameAr: new FormControl(this.surah.nameAr, [Validators.required]),

      sortOrder: new FormControl(this.surah.sortOrder, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }
  addSurah() {
    if (this.surah.id == null || this.surah.id == undefined) {
      this.Subscription.add(
        this.categoryService.addCategory(this.addForm.value).subscribe(
          (res: any) => {
            this.refreshData.emit(this.addForm.value);
            this.router.navigate([`dashboard/categories`]);
            this.notificationService.showNotification(
              'Category Added Successfuly',
              'ok',
              'success'
            );
          },
          (err) => {
            this.notificationService.showNotification(
              'Category Add Faild',
              'ok',
              'error'
            );
          }
        )
      );
    } else {
      this.surah.nameEn = this.addForm.value.nameEn;
      this.surah.nameAr = this.addForm.value.nameAr;
      (this.surah.sortOrder = this.addForm.value.sortOrder),
        this.Subscription.add(

        );
    }
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
