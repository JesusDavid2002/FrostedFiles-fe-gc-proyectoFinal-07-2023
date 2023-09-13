import { Component, OnInit } from '@angular/core';
import { FormControl,AbstractControl,ValidationErrors,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  passwordsMatch: boolean = false;
  formError: boolean = false;

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value === 'string' && !value.includes('@')) {
      return { invalidEmail: true };
    }
    return null;
  }

  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {
    
    this.formReg = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordValidation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.formReg.valid) {
      let password = this.formReg.get('password')?.value;
      let passwordValidation = this.formReg.get('passwordValidation')?.value;
  
      if (password === passwordValidation) {
        const fechaCreacion = new Date().toISOString();
        const userData = {
          username: this.formReg.get('username')?.value,
          email: this.formReg.get('email')?.value,
          password: this.formReg.get('password')?.value,
          fechaCreacion: fechaCreacion,
        };
        if (password.length < 8) {
          alert('La contraseña debe tener al menos 8 caracteres.');
        } else {
          this.userService.register(userData).subscribe(
            res => {
              // console.log(res);
              this.router.navigate(['/home']);
            },
            err => {
              console.log(err);
            }
          );
        }
      } else {
        this.passwordsMatch = true;
      }
    } else {
      if (this.formReg.get('username')?.hasError('minlength')) {
        alert('El nombre de usuario debe tener al menos 6 caracteres.');
      }
      if (this.formReg.get('email')?.hasError('required')) {
        alert('El correo electrónico es obligatorio.');
      }
      if (this.formReg.get('email')?.hasError('invalidEmail')) {
        alert('El correo electrónico debe ser válido (contener "@").');
      }
      if (this.formReg.get('password')?.hasError('minlength')) {
        alert('La contraseña debe tener al menos 8 caracteres.');
      }
      if (this.formReg.get('passwordValidation')?.hasError('required')) {
        alert('La contraseña tiene que coincidir.');
      }
    }
  }
}
