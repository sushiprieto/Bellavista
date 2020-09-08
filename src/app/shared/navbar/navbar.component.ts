import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  public user: any;
  public user$:Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc:AuthService, private router:Router) { }

  async ngOnInit() {
    this.authSvc.afAuth.user
    console.log('Navbar');
     this.user = await  this.authSvc.getCurrentUser();
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      await this.router.navigate(['/login']);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

  }

}