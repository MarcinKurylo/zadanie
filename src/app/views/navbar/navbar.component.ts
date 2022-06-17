import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog) { }

  public openDialog() {
    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      width: '250px',
    });
  }

}
