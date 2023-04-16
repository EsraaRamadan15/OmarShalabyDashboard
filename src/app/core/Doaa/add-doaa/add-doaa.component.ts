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
  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fileToUpload: new FormControl('', [Validators.required])
  });
  get name() {
    return this.addForm.get('name')
  }
  get file() {
    return this.addForm.get('fileToUpload')
  }
  doaa = {} as Doaa;
  fileToUpload: File | null = null;

  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  isAddMode!: boolean;
  Subscription: Subscription = new Subscription();
  editMode = false;
  constructor(
    private airlineService: DoaaService,
    private router: Router,
    private notificationService: ToasterNotifierService
  ) { }

  ngOnInit(): void {

  }


  addDoaa() {
    const dueData = new FormData()
    dueData.append("path", this.file?.value)
    dueData.append('type', "due")
    dueData.append('des', "due")
    dueData.append('name', this.name?.value)
    this.Subscription.add(
      this.airlineService.addADoaa(dueData).subscribe(
        (res: any) => {
          this.refreshData.emit(res.data)
          this.router.navigate([`dashboard/doaa-list`]);
          this.notificationService.showNotification(
            res.message_en,
            'ok',
            'success'
          );
        },
        (err) => {

          this.notificationService.showNotification(
            err.error.error_ar ? err.error.error_ar : err.error.error,
            'ok',
            'error'
          );

          console.log('errrrooor');
        }
      )
    );
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    const file = files.item(0);
    if (file) {
      this.fileToUpload = file;
      const fileToUploadControl = this.addForm.get('fileToUpload');
      if (fileToUploadControl) { // check if the control is not null or undefined
        fileToUploadControl.setValue(file);
        console.log(fileToUploadControl);

      }
    }
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
}
