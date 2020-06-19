import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContact } from '../models/contacts.interface';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, OnDestroy {

  src: any = '';
  blob: Blob = null;
  addForm: FormGroup;
  isEdit: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<AddContactComponent>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private data: IContact
  ) {
      this.addForm = fb.group({
           first_name: ['', Validators.required],
           last_name: ['', Validators.required],
           phone_number: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    // Edit Form Contract
    if(this.data) {
        this.addForm.patchValue(this.data);
        this.src = this.data.file;
        this.isEdit = true;
    }
    
  }

  uploadFile(e: any) {
    const file: Blob = e.target.files[0];
    if( file && file.type.includes('image') ) {
      this.src = URL.createObjectURL(file);
      this.blob = file;
    }
  };

  onSubmit()  {
    if(this.addForm.valid) {
      this.dialogRef.close({ form_value:this.addForm.value, file: this.blob }  );
    }
  };
  
  ngOnDestroy() {
    if(this.src) {
      URL.revokeObjectURL(this.src);
    }
  };

};
