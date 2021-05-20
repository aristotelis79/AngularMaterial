import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  user: User;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4']
  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) { }

  ngOnInit(): void {
    this.user = new User();
  }

  save() {
    this.user.name = this.name.value;
    this.dialogRef.close(this.user);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
