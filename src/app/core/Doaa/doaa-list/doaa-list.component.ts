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
import { DoaaService } from '../doaa-service.service';
import { Doaa } from '../../models/doaa';

@Component({
  selector: 'app-dooas',
  templateUrl: './doaa-list.component.html',
  styleUrls: ['./doaa-list.component.css'],
})
export class DoaaListComponent implements OnInit, OnDestroy {
  doaas: Doaa[] = [];
  Subscription: Subscription = new Subscription();

  constructor(
    private doaaService: DoaaService,
    private router: Router,
    private dialogService: DialogServiceService,
    private notificationService: ToasterNotifierService
  ) {}

  ngOnInit(): void {
    this.GetAllDueas();
  }
  GetAllDueas() {
    this.Subscription.add(
      this.doaaService.getAllDoaas().subscribe((res: any) => {
        console.log(res, 'surahs');
        this.doaas = res;
      })
    );
  }
  viewDoaa(ID: string | null) {
    console.log('ok');
    this.router.navigate([`dashboard/sub-surahs/${ID}`]);
    console.log(ID);
  }
  addDoaa() {
    this.router.navigate([`dashboard/add-doaa`]);
  }
  editDoaa(category: any) {
    console.log(category);
    this.router.navigate([
      `dashboard/edit-category`,
      {
        id: category.id,
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        sortOrder: category.sortOrder,
      },
    ]);
  }
  deleteDoaa(id: string | null) {
    this.dialogService
      .openConfirmMessage('Are you sure to delete this Duea?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.doaaService.deleteDoaa(id).subscribe(
            (res) => {
              if (res) {
                this.notificationService.showNotification(
                  'Duea Deleted Successfuly',
                  'ok',
                  'success'
                );

                this.GetAllDueas();
              }
            },
            (err) => {
              this.notificationService.showNotification(
                'Duea Deleted Faild',
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
