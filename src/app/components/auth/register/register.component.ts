import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      passwordValidation: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formReg.valid) {
      let password = this.formReg.get('password')?.value;
      let passwordValidation = this.formReg.get('passwordValidation')?.value;
  
      if (password === passwordValidation) {
        this.userService.register(this.formReg.value)
          .then((res) => {
            console.log(res);
            this.router.navigate(['/home']);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert('Las contraseñas no son iguales.');
      }
    } else {
      alert('Por favor, rellene todos los campos obligatorios.');
    }
  }
}
