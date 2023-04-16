import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterNotifierService } from 'src/app/shared/toaster-notifier.service';
import { Doaa } from '../../models/doaa';
import { DoaaService } from '../doaa-service.service';

@Component({
  selector: 'app-add-doaa',
  templateUrl: './add-doaa.component.html',
  styleUrls: ['./add-doaa.component.css'],
})
export class AddDoaaComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});
  doaa = {} as Doaa;

  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  isAddMode!: boolean;
  Subscription: Subscription = new Subscription();
  editMode = false;
  constructor(
    private roterActivate: ActivatedRoute,
    private airlineService: DoaaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private notificationService: ToasterNotifierService
  ) {}

  ngOnInit(): void {
    if (this.roterActivate.snapshot.url[0].path == 'edit-airline') {
      this.editMode = !this.editMode;
    }
    this.doaa = {
      id: this.roterActivate.snapshot.paramMap.get('id'),
      name: this.roterActivate.snapshot.paramMap.get('name'),
      description: 0,
    };
    this.initForm();
  }

  initForm() {
    this.addForm = new FormGroup({
      name: new FormControl(this.doaa.name, [Validators.required]),
    });
  }
  addDoaa() {
    if (this.doaa.id == null || this.doaa.id == undefined) {
      this.Subscription.add(
        this.airlineService.addADoaa(this.addForm.value).subscribe(
          (res: any) => {
            this.doaa = res.result;
            this.router.navigate([`dashboard/airlins-list`]);
            this.notificationService.showNotification(
              'Airline Added Successfuly',
              'ok',
              'success'
            );
          },
          (err) => {
            this.notificationService.showNotification(
              'Airline Added Faild',
              'ok',
              'error'
            );

            console.log('errrrooor');
          }
        )
      );
    } else {
      this.doaa.name = this.addForm.value.name;
      this.Subscription.add(
        this.airlineService.editDoaa(this.doaa).subscribe(
          (res: any) => {
            console.log(res);
            this.refreshData.emit(this.doaa);
            this.router.navigate([`dashboard/airlins-list`]);
            this.notificationService.showNotification(
              'Airline Edited Successfuly',
              'ok',
              'success'
            );
          },
          (err) => {
            this.notificationService.showNotification(
              'Airline Edit Faild',
              'ok',
              'error'
            );
            console.log('errrrooor');
          }
        )
      );
    }
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
}
