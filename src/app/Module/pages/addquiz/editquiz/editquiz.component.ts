import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';



@Component({
  selector: 'app-editquiz',
  templateUrl: './editquiz.component.html',
  styleUrls: ['./editquiz.component.scss']
})
export class EditquizComponent implements OnInit {
  id:any
  quizdata:any;
  leng = 0;
  value!:any;
  row:any=[]
  addquiz!:FormGroup
  constructor( private actRoute: ActivatedRoute,private router:Router, private storage:AngularFireStorage,private fb:FormBuilder,private qs:QuizService) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.qs.getQuizById(id!).subscribe((data:any)=>{
      this.quizdata = data;
      this.addquiz.setValue(data)
      this.options.setValue([this.quizdata.options])
      this.leng =data.options.length;
          
  })}


  ngOnInit(): void {
    this.addquiz = this.fb.group({
      question:[''],
      answer:[''],
      field:[''],
     image:[''],
     options:this.fb.array([this.fb.control('')]),
    })

    this.qs.getc().subscribe(data=>{
      this.row = data
    })
  
    this.auto();
  }

  
  

  updatequiz() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Sure You wanna Update?')){
      this.qs.quizUpdate(id!,this.addquiz.value)
      this.router.navigateByUrl('showquiz');
    }
  }

  get que(){
      return this.addquiz.controls['question']
  }

  get answer(){
    return this.addquiz.controls['answer']
  }

  



  // submitQuizForm() {
  //   this.addquiz = this.fb.group({
  //     question:[''],
  //     answer:[''],
  //     field:[''],
  //    image:[''],
  //    options:this.fb.array([])
  //   })
   
  // }
 
  get options(){
    return this.addquiz.get('options') as FormArray
  }
  remove(i:number){
    this.options.removeAt(i)
  }
  
  add() {
    this.options.push(this.fb.control(''));
  }
 
  auto(){
    for (let i = 0; i < this.leng; i++) {
    this.options.push(new FormControl(this.quizdata.options[i]))
    }
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
