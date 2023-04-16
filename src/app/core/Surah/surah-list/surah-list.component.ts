import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogServiceService } from 'src/app/shared/dialog-service.service';
import { ToasterNotifierService } from 'src/app/shared/toaster-notifier.service';
import { SurahService } from '../services/surah-service.service';
import { Surah } from '../../models/surah';

@Component({
  selector: 'app-surahs',
  templateUrl: './surah-list.component.html',
  styleUrls: ['./surah-list.component.css'],
})
export class SurahsListComponent implements OnInit, OnDestroy {
  surahs: Surah[] = [];
  Subscription: Subscription = new Subscription();

  constructor(
    private surahService: SurahService,
    private router: Router,
    private dialogService: DialogServiceService,
    private notificationService: ToasterNotifierService
  ) { }

  ngOnInit(): void {
    this.getAllsurahs();
  }
  getAllsurahs() {
    this.Subscription.add(
      this.surahService.getAllsurahs(1, 10).subscribe((res: any) => {
        console.log(res, 'surahs');
        this.surahs = [{ id: "1", nameEn: "el fatiha", nameAr: "uuuu", description: "test", sortOrder: "1", fileToUpload: null }];
        console.log(this.surahs);
      })
    );
  }
  viewSubCategory(ID: string | null) {
    console.log('ok');
    this.router.navigate([`dashboard/sub-surahs/${ID}`]);
    console.log(ID);
  }
  addSurah() {
    this.router.navigate([`dashboard/add-surah`]);
  }
  editSurah(category: any) {
    console.log(category);
    this.router.navigate([
      `dashboard/edit-category`,
      {
        id: category.id,
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        description: category.description,
        sortOrder: category.sortOrder,
      },
    ]);
  }
  deleteSurah(catId: string | null) {
    this.dialogService;
    this.dialogService
      .openConfirmMessage('Are you sure to delete this Surah?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.surahService.deleteSurah(catId).subscribe(
            (res) => {
              if (res) {
                this.notificationService.showNotification(
                  'Surah Deleted Successfuly',
                  'ok',
                  'success'
                );

                this.getAllsurahs();
              }
            },
            (err) => {
              this.notificationService.showNotification(
                'Category Deleted Faild',
                'ok',
                'error'
              );
              console.log('errrrooor');
            }
          );
        }
      });
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
}
