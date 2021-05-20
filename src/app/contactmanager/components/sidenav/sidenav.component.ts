import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean;
  isDarkTheme: boolean;

  users: Observable<User[]>;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private route: Router  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`]) //or.observe([Breakpoints.XSmall ]) //deafults
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll();

    ///Not need becouse of main contanet oninit
    // this.users.subscribe(data => {
    //   if (data.length > 0){
    //     this.route.navigate(['/contactmanager', data[0].id]);
    //   }
    // });

    this.route.events.subscribe(() => {
      if (this.isScreenSmall){
        this.sidenav.close();
      }
    });
  }

  toogleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

}
