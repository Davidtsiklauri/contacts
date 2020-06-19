import { Component, OnInit  } from '@angular/core';
import { ContactsService } from '../../contacts.service';
import { IContact, iContactsSearch } from '../../models/contacts.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../../add-contact/add-contact.component';
import { Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CreateGroupsModalComponent } from './create-groups-modal/create-groups-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts: IContact[] = [];
  contactId: string = '';
  selectedContacts: string[] = [];
  isLoading: boolean = true;
  searchForm: FormGroup;

  constructor( 
    private contactsService: ContactsService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { 
    this.searchForm  = fb.group({
      first_name: [''],
      last_name: [''],
      phone_number: ['']
    })
  }

  ngOnInit(): void {
    
    this.contactsService
        .getContacts()
        .subscribe(data => {this.contacts = data.contacts; this.contactsService.amount = data.amount; this.isLoading = false});
    // Add Contact 
    this.contactsService
        .$contact
        .subscribe((contact: (IContact | undefined)) => {
          if(contact) {
              this.contacts.push(contact)
          }
    })
    
    // Search Form
    this.searchForm
        .valueChanges.pipe(
           debounceTime(200),
           distinctUntilChanged(),
           tap(() => this.isLoading = true),
           switchMap((value: iContactsSearch) => this.searchContacts(value)),
        ).subscribe((contacts: iContactsSearch[]) => {this.contacts = contacts; this.isLoading = false});
  };

  getResult(e: any) {
     if(e) {
       this.contactId = e.contact_id;
       switch (e._type) {
         case "delete":
           return this.contactsService.deleteContact(this.contactId)
                      .subscribe(() => this.contacts = this.contacts.filter(cont => cont.contact_id !== this.contactId));
         case "edit": 
           const contact = this.contacts.find((cont) => cont.contact_id === this.contactId );
           this.contactId = this.contactId;
           return this.openEditForm(contact);
       }
     }
  }

  openEditForm(contact: any) {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '1200',
      height: '1200',
      data: contact
    });
    
    dialogRef.afterClosed()
             .subscribe(
                 (data) => {
                    if(data && data.form_value) {
                      this.contactsService
                          .updateContact(this.contactId, data.form_value)
                          .pipe(
                             switchMap(() => this.uploadFile(data.file, this.contactId) )
                          ).subscribe((file) => {
                                const index = this.contacts.findIndex(cont => cont.contact_id === this.contactId);
                                this.contacts[index] = {...data.form_value, file: file ? file.file : '', contact_id: this.contactId};
                          });
                    }
                 }
             )    
  };

  uploadFile(file: Blob, contact_id: string): Observable<any> {
    const formData = new FormData();
    if(file) {
      formData.append('file', file)
      return this.contactsService.uploadFile(contact_id, formData);
    }
    else {
      return of(null);
    }
  };

  handleValueChange(isChecked: boolean , contact_id: string) {
    if(isChecked) {
      this.selectedContacts.push(contact_id)
    } else {
       this.selectedContacts = this.selectedContacts.filter(id =>  id !== contact_id);
    }
  };

  openAddGroupModal() {
    const dialogRef = this.dialog.open(CreateGroupsModalComponent);

    dialogRef.afterClosed()
             .pipe(
               switchMap((name) => this.createGroup(name))
             ).subscribe(data => console.log(data))
  };

  createGroup(name: string): Observable<any> {
    return  this.contactsService.createGroup({
        contact_ids: this.selectedContacts,
        group_title: name
      })
  };

  searchContacts( input: iContactsSearch ): Observable<any> {
      return this.contactsService.searchContacts(input);
  };

  
}
