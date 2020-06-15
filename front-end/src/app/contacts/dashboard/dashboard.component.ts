import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  };


  openAddForm() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '1200',
      height: '1200'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.file}`);
    });
  }
}
