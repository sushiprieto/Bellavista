import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;

    try {
      const user = await this.authSvc.login(email, password);
      console.log('Form -->', this.registerForm.value);

      if (user) {
        //redirect
        this.router.navigate(['/home'])
      }
    } catch (error) {
      console.log(error);
    }
    this.authSvc.register(email, password);
    console.log('Form -->', email, password);
  }
}
