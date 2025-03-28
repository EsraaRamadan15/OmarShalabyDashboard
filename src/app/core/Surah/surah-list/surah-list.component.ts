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
import { DoaaSurahhListItem } from '../../models/doaaSurahListItem';

@Component({
  selector: 'app-surahs',
  templateUrl: './surah-list.component.html',
  styleUrls: ['./surah-list.component.css'],
})
export class SurahsListComponent implements OnInit, OnDestroy {
  surahs: DoaaSurahhListItem[] = [];
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
      this.surahService.getAllsurahs().subscribe((res: any) => {
        this.surahs = res;
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

  editSurah(id: string) {
    this.router.navigate([
      `dashboard/edit-surah/${id}`
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
                'Surah Deleted Faild',
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
