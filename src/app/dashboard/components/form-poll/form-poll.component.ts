import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-poll',
  templateUrl: './form-poll.component.html',
  styleUrls: ['./form-poll.component.css']
})
export class FormPollComponent implements OnInit {


  form:FormGroup=this.fb.group({
    name:[
      '',[
        Validators.required,
        Validators.minLength(3),
      ]
    ],
    finish:['',[Validators.required,]],
    options:[
      '',[
        Validators.required,
        Validators.minLength(10),
    ]]

  })
  constructor(private fb:FormBuilder) { }
  fieldNotValidate( field: string ) {
    return this.form.get(field)?.invalid
            && this.form.get(field)?.touched;
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
  get finishErrorMsg(): string {
    const errors= this.form.get('finish')?.errors;
    if(errors?.required){
      return 'Debe ingresar una fecha';
    } 
    return '';
  }
  get optionsErrorMsg(): string {
    const errors= this.form.get('finish')?.errors;
    if(errors?.required){
      return 'Debe ingresar una fecha';
    } else if(errors?.minlength){
      return 'Las opciones debe tener como minimo 10 caracteres';
    }
    return '';
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.form.valid) {
      const { name } = this.form.value;

    }
  }
}
