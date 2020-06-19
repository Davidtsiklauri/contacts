import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IContact, IGroupAdd, iContactsSearch } from './models/contacts.interface';


const API = 'api';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public amount: number = 0;
  public $contact: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }


   
  /**
   * @method GET
   */
  getContacts(): Observable<any> {
    return this.http.get(`${API}/contacts/all`);
  };

  /**
   * @param input 
   * @method POST
   */
  addContact(input: IContact): Observable<any> {
    return this.http.post(`${API}/contacts`, input)
  };

  /**
   * 
   * @param contact_id 
   * @method DELETE
   */
  deleteContact(contact_id: string): Observable<any> {
     return this.http.delete(`${API}/contacts/${contact_id}`)
  };
  
  /**
   * 
   * @param contact_id 
   * @method PUT
   */
  updateContact(contact_id: string, input: IContact): Observable<any> {
     return this.http.put(`${API}/contacts/${contact_id}`, input);
  };

  /**
   * @method POST
   */
  uploadFile(contact_id: string, file: FormData): Observable<any> {
     return this.http.post(`${API}/upload/contacts/${contact_id}`, file );
  };

 
  /**
   * 
   * @param input 
   * @method POST
   */
  createGroup(input: IGroupAdd): Observable<any> {
     return this.http.post(`${API}/groups`, input);
  };

  /**
   * @method GET
   */
  getGroups(): Observable<any> {
     return this.http.get(`${API}/groups/all`);
  }

  /**
   * @method POST
   */
  searchContacts(input: iContactsSearch): Observable<any> {
     return this.http.post(`${API}/contacts/search`, input);
  }
}
