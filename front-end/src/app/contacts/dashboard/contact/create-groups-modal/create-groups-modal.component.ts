import { Component, OnInit } from '@angular/core';
import { AddContactComponent } from 'src/app/contacts/add-contact/add-contact.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-groups-modal',
  templateUrl: './create-groups-modal.component.html',
  styleUrls: ['./create-groups-modal.component.scss']
})
export class CreateGroupsModalComponent implements OnInit {

  nameCtrl: FormControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AddContactComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit()  {
    if(this.nameCtrl.valid) {
       this.dialogRef.close( this.nameCtrl.value);
    }
  };

}
