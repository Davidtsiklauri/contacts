import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, OnDestroy {

  src: any = '';
  blob: Blob = null;
  addForm: FormGroup;

  
  constructor(
    private dialogRef: MatDialogRef<AddContactComponent>,
    private fb: FormBuilder
  ) {
      this.addForm = fb.group({
           user_name: ['', Validators.required],
           last_name: ['', Validators.required],
           phone_number: ['', Validators.required]
      })
   }

  ngOnInit(): void {
  }

  uploadFile(e: any) {
    const file: Blob = e.target.files[0];
    if( file && file.type.includes('image') ) {
      this.src = URL.createObjectURL(file);
      this.blob = file;
    }
  };

  ngOnDestroy() {
    if(this.src) {
      URL.revokeObjectURL(this.src);
    }
  };
  
  onNoClick(isSaveBoolean: boolean )  {
    this.dialogRef.close(isSaveBoolean && {...this.addForm, file: this.blob }  );
  }

}
