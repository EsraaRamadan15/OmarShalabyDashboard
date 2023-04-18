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
  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fileToUpload: new FormControl('', [Validators.required]),
  });
  get name() {
    return this.addForm.get('name')?.value
  }

  get description() {
    return this.addForm.get('description')?.value
  }
  get file() {
    return this.addForm.get('fileToUpload')?.value
  }
  surah = {} as Surah;
  fileToUpload: File | null = null;
  id: string = '';

  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  isAddMode!: boolean;
  Subscription: Subscription = new Subscription();

  editMode = false;

  constructor(
    private categoryService: SurahService,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private notificationService: ToasterNotifierService
  ) { }

  ngOnInit(): void {
    this.routeActivate.params.subscribe(param => {
      if (param['id']) {
        this.id = param['id']
        this.editMode = !this.editMode;

        this.categoryService.getSurah(this.id).subscribe((res: any) => {
          this.surah = res;

          // const { fileToUpload } = res;
          console.log("Ewgw: ", this.surah)

          // this.angularFilePath = fileToUpload.replace(/\\/g, '/');

          // console.log("SGRE:G ", this.angularFilePath);
          // this.path = `http://localhost:8080/${this.angularFilePath}`;

          // console.log("ewgjweg: ", this.path);
        })
      }
    });

  }

  addSurah() {
    let formData = new FormData();
    formData.append('name', this.name)
    formData.append("path", this.file)
    formData.append('type', "quran")
    formData.append('des', this.description)

    console.log("WEGWEGW: ", formData)
    if (!this.editMode) {
      this.Subscription.add(
        this.categoryService.addSurah(formData).subscribe(
          (res: any) => {
            this.refreshData.emit(this.addForm.value);
            this.router.navigate([`dashboard/surahs-list`]);
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
      
      this.categoryService.editSurah(this.id, formData).subscribe({
    
        next: (res: any) => {
          this.refreshData.emit(res.data)
          this.router.navigate([`dashboard/surahs-list`]);
          this.notificationService.showNotification(
            res.message_en,
            'ok',
            'success'
          );
        },
        error: (err: any) => {
          this.notificationService.showNotification(
            err.error.error_ar ? err.error.error_ar : err.error.error,
            'ok',
            'error'
          );
        }
      })
    }

  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    const file = files.item(0);
    if (file) {
      this.fileToUpload = file;
      const fileToUploadControl = this.addForm.get('fileToUpload');
      if (fileToUploadControl) { // check if the control is not null or undefined
        fileToUploadControl.setValue(file);
      }
    }
  }
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
