import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {

  category!:FormGroup;
  constructor(private fb:FormBuilder,public qs:QuizService,public router:Router) { }

  ngOnInit(): void {
this.category = this.fb.group({
  Title:['',Validators.required],
  Discription:['',Validators.required]
  })

}

addcategory(){
    this.qs.addcategoty(this.category.value)
    this.router.navigateByUrl('show');
}

  
}
