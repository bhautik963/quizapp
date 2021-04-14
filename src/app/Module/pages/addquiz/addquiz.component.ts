import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { QuizService } from 'src/app/Services/quiz.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.scss']
})
export class AddquizComponent implements OnInit {

  value!:any;
  row:any = [];
  addquiz!:FormGroup

  constructor( private storage:AngularFireStorage,private fb:FormBuilder,public add:QuizService) { }
  ngOnInit(): void {
    this.submitQuizForm()
     this.value = JSON.parse(localStorage.getItem('admin')!);
     this.add.getc().subscribe(data=>{
      this.row = data
    })
    
    
  }

  
  

  submitquiz() {
    console.log(this.addquiz.value)
      this.add.addData(this.addquiz.value)
      this.resetForm();
  }

  get que(){
      return this.addquiz.controls['question']
  }

  get answer(){
    return this.addquiz.controls['answer']
  }

  



  submitQuizForm() {
    this.addquiz = this.fb.group({
     options:this.fb.array([this.fb.control('')]),
     image:[''],
     answer:[''],
     question:[''],
     field:['']
    })
  }
 
  get options(){
    return this.addquiz.controls['options'] as FormArray
  }
  remove(i:number){
    this.options.removeAt(i)
  }
  
  addoption() {
    this.options.push(this.fb.control(''));
  }
 
   

  uploadFile(e:any){
    const file = e.target!.files[0];
    // console.log(file)
    const filePath =`images/${file.name}`;
    this.img.setValue(filePath)
    const ref = this.storage.ref(filePath);
    console.log(ref)
    const task = ref.put(file);
  
  }

  get img(){
    return this.addquiz.controls['image'];
  }

  resetForm() {
    this.addquiz.reset();
    Object.keys(this.addquiz.controls).forEach(key => {
      this.addquiz.controls[key].setErrors(null)
    });
  }
}
