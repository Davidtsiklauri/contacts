import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactsService } from '../contacts.service';
import { IContact } from '../models/contacts.interface';
import { switchMap } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  contact: IContact = null;
  isContacts: boolean = true;
  $desroy: Subject<any> = new Subject<any>();
  isMobile: boolean = false;
  isNavbaraExpanded: boolean = true;

  constructor(
    private dialog: MatDialog,
    public contactsService: ContactsService,
    public globalService: GlobalService,
    public router: Router,
    private breakPointObserver: BreakpointObserver
  ) { }


  ngOnInit(): void {
    this.breakPointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe((result) => {if(result.matches) this.isMobile = true });
    
  }
  
  openAddForm() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '1200',
      height: '1200'
    });

    dialogRef.afterClosed() 
             .subscribe(
                (input) => {
                      if(input) {
                        this.contactsService
                            .addContact(input.form_value)
                            .pipe(switchMap((data) => this.handleFileOnUpload(data, input.file)))
                            .subscribe(({file}) =>  this.contactsService.$contact.next({ file: file ? file : '', ...this.contact }));
                      }
                }
             )
  };

  handleFileOnUpload( data: any, file: Blob ): Observable<any>{
      this.contact = data;
      const formData = new FormData();
      formData.append('file', file);
      return this.contactsService.uploadFile(data.contact_id, formData);
  };
   
 
}
