import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Resp } from 'src/app/models/resp';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4)
    ]],
    name:['',[
      Validators.required,
      Validators.minLength(3)

    ]]
  });

  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  fieldNotValidate( field: string ) {
    return this.form.get(field)?.invalid
            && this.form.get(field)?.touched;
  }
  get emailErrorMsg(): string {
    const errors= this.form.get('email')?.errors;
    if(errors?.required){
      return 'Debe ingresar un email';
    } else if(errors?.email){
      return 'El valor ingresado no tiene formato de correo';
    }
    return '';
  }
  get passwordErrorMsg(): string {
    const errors= this.form.get('password')?.errors;
    if(errors?.required){
      return 'Debe ingresar una contraseña';
    } else if(errors?.minlength){
      return 'La contraseña debe tener como minimo 4 caracteres';
    }
    return '';
  }
  get nameErrorMsg(): string {
    const errors= this.form.get('name')?.errors;
    if(errors?.required){
      return 'Debe ingresar un nombre';
    } else if(errors?.minlength){
      return 'El nombre debe tener como minimo 3 caracteres';
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.auth.signin(email, password).subscribe(
        (resp:Resp)=>{
          if(resp.status===1){
            this.router.navigate(['/']);
          }
        }
      );
    }
  }


}
