import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  passwordError: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value).subscribe(
      res => {
        // console.log(res);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
        this.passwordError = true;
      }
    );
  }
}
