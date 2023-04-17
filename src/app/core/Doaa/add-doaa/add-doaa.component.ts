import { log } from 'console';
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
    description: new FormControl('', [Validators.required]),
    fileToUpload: new FormControl('', [Validators.required]),
  });
  get name() {
    return this.addForm.get('name')?.value;
  }
  get description() {
    return this.addForm.get('description')?.value;
  }
  get file() {
    return this.addForm.get('fileToUpload')?.value;
  }
  doaa = {} as Doaa;
  id: string = '';
  fileToUpload: File | null = null;

  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  isAddMode!: boolean;
  Subscription: Subscription = new Subscription();
  editMode = false;
  angularFilePath: string = '';
  path: string = '';
  constructor(
    private doaService: DoaaService,
    private routeActivate: ActivatedRoute,
    private router: Router,
    private notificationService: ToasterNotifierService
  ) { }

  ngOnInit(): void {
    // const filePath = 'uploads\Tamer Hosny ... Mabatalnash Ehsas - 2020 _ ØªØ§ÙØ± Ø­Ø³ÙÙ ... ÙØ¨Ø·ÙÙØ§Ø´ Ø§Ø­Ø³Ø§Ø³ (320 kbps).mp3-1681691430718... Mabatalnash Ehsas - 2020 _ ØªØ§ÙØ± Ø­Ø³ÙÙ ... ÙØ¨Ø·ÙÙØ§Ø´ Ø§Ø­Ø³Ø§Ø³ (320 kbps).mp3';
    // this.angularFilePath = filePath.replace('\\', '/');
    // this.tt = `http://localhost:8080/${this.angularFilePath}`;

    // Convert the Windows-style file path to an Angular-style file path
    this.routeActivate.params.subscribe(param => {
      if (param['id']) {
        this.id = param['id']
        this.editMode = !this.editMode;

        this.doaService.getDoaaById(this.id).subscribe((res: any) => {
          this.doaa = res;
          const { fileToUpload } = res;
          console.log("Ewgw: ", fileToUpload)

          this.angularFilePath = fileToUpload.replace(/\\/g, '/');

          console.log("SGRE:G ", this.angularFilePath);
          this.path = `http://localhost:8080/${this.angularFilePath}`;

          console.log("ewgjweg: ", this.path);
        })
      }
    });
  }


  addDoaa() {
    const dueData = new FormData()
    console.log("WEGWEGEGE: " , this.description)
    dueData.append('name', this.name)
    dueData.append("path", this.file)
    dueData.append('type', "due")
    dueData.append('des', this.description);
    if (!this.editMode) {
      this.Subscription.add(
        this.doaService.addDoaa(dueData).subscribe({
          next: (res: any) => {
            this.refreshData.emit(res.data)
            this.router.navigate([`dashboard/doaa-list`]);
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

      );
    } else {
      this.doaService.editDoaa(this.id, dueData).subscribe({
        next: (res: any) => {
          this.refreshData.emit(res.data)
          this.router.navigate([`dashboard/doaa-list`]);
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
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
}
