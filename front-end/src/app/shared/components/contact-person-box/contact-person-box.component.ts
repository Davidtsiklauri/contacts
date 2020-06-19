import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from 'src/app/contacts/models/contacts.interface';

@Component({
  selector: 'app-contact-person-box',
  templateUrl: './contact-person-box.component.html',
  styleUrls: ['./contact-person-box.component.scss']
})
export class ContactPersonBoxComponent implements OnInit {

  @Input() contact: IContact;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitData(type: string, contact_id: string) {
      this.result
          .emit({ _type: type, contact_id });
  };

}
