import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../contacts.service';
import { IGroup } from '../../models/contacts.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  
  groups: IGroup[] = [];
  isLoading: boolean = true;

  constructor(
    private contactService: ContactsService
  ) { }

  ngOnInit(): void {
    this.contactService
        .getGroups()
        .subscribe(( groups: IGroup[] ) => {this.groups = groups; this.isLoading = false; this.contactService.amount = this.groups.length});
  }

}
