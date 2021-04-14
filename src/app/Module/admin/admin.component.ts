import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminModal } from 'src/app/Services/model/user.modal';
import {QuizService} from './../../Services/quiz.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  disableSelect = new FormControl(false);
  formGroup!: FormGroup;
  isLoading: Boolean = false;
  user:any =1;
  constructor(private quizService: QuizService, public route: Router) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  get form() {
    return this.formGroup.controls;
  }


  get field(){
    return this.formGroup.controls['field'];
  }

  initReactiveForm() {
    this.formGroup = new FormGroup({
      'username': new FormControl('admin', [Validators.required]),
      'email': new FormControl('admin@gmail.com', [Validators.required]),
      'field': new FormControl('Angular',[Validators.required])
    })
  }

  submitForm() {
    const userData: AdminModal = {
      username: this.form.username.value,
      email: this.form.email.value,
      field:this.field.value
    }
    
    this.isLoading = true;
if(userData.username=="admin" && userData.email=="admin@gmail.com"){

  // this.quizService.createAdmin(userData)
  //   .then(res => {
    const userDetail = {
      // id: res.id,
      name: userData.username,
      email: userData.email,
      field:userData.field
    }
    localStorage.clear();
    localStorage.setItem("admin", JSON.stringify(userDetail));
    localStorage.setItem('sessionAdmin',this.user)
    
    this.route.navigate(['/adminnav']);
    this.isLoading = false;
    // // })
    // .catch(err => {
      //   this.isLoading = false;
      //   console.log(err.message);
      // });
    }
    else{
      window.alert('Username And password is not verify')
      this.formGroup.reset();
    }
  }

}
