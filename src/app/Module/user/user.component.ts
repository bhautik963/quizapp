import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { UserModal } from 'src/app/Services/model/user.modal';
import {QuizService} from './../../Services/quiz.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading: Boolean = false;
  fields:any=[];
  selectedCompany!: Observable<any>
  user='1'
  constructor(private quizService: QuizService, public route: Router) { }

  ngOnInit(): void {

    this.initReactiveForm();
    
    this.quizService.getc().subscribe(data=>{
      
      this.fields = data
    })
  }

  get form() {
    return this.formGroup.controls;
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  initReactiveForm() {
    this.formGroup = new FormGroup({
      'username': new FormControl('akash12', [Validators.required,Validators.pattern('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$')]),
      'email': new FormControl('akash12@gmail.com', [Validators.required,Validators.pattern('^[a-z0-9](\.?[a-z0-9]){5,}@g?mail\.com$')]),
      'field': new FormControl('', [Validators.required])
    })

  }

  get username(){
    return this.formGroup.controls['username']
  }
  get email(){
    return this.formGroup.controls['email']
  }

  get field(){
    return this.formGroup.controls['field']
  }

  submitForm() {
    if(this.username.value != '' && this.email.value != '' && this.field.value != ''){
      const userData: UserModal = {
        username: this.form.username.value,
        email: this.form.email.value
      }
    this.quizService.selectField = this.field.value;   
      
      this.isLoading = true;
      this.quizService.createUser(userData)
        .then(res => {
          const userDetail = {
            id: res.id,
            name: userData.username,
            email: userData.email
          }
          // localStorage.clear();
          localStorage.setItem("userData", JSON.stringify(userDetail));
         localStorage.setItem('sessionUser',this.user)

          this.route.navigate(['/quiz']);
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err.message);
        });
    }
   
  }

}
