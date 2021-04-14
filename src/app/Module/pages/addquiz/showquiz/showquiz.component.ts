import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from 'src/app/Services/quiz.service';
import { QuestionModal } from './../../../../Services/model/question.modal';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditquizComponent } from '../editquiz/editquiz.component';
import { ViewdialogComponent } from './viewdialog/viewdialog.component';
@Component({
  selector: 'app-showquiz',
  templateUrl: './showquiz.component.html',
  styleUrls: ['./showquiz.component.scss']
})



export class ShowquizComponent implements OnInit {
   data:any;
   rows:any = [];
   temp:any =[];
   animal!: string;
   name!: string;
   value?:[];
  @ViewChild('mytable') table!: DatatableComponent;
  


  constructor(public qs:QuizService,public dialog: MatDialog,) { 
  }

  ngOnInit(): void {
    // this.table.offset = 0;
    this.getQuizData()
    this.rows=this.data
  }

  filterData(id:any, data:any) {
    return {
      id: id,
      answer: data.answer,
      imageName: data.image,
      options: data.options,
      question: data.question,
      field:data.field,
      participantAnswer: -1
    }
  }

  // Getting quiz data
  getQuizData() {
   
    this.qs.getData().subscribe(
      res => {
        
        const filteredData: QuestionModal[] = res.map(response => {
          return this.filterData(response.payload.doc.id, response.payload.doc.data());
        })
       this.data  = filteredData;
       this.rows= this.data;
       this.temp =[...this.data];
        // console.log(this.data);
        
      },
      err => {
  
        console.log(err);
      }
    );
  }
  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    
    const temp = this.temp.filter(function (d:any) {
      return d.field.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;

  }

  geturl(e:any){
    const a = e.split('/')
    //  return "https://firebasestorage.googleapis.com/v0/b/my-project-1565243588474.appspot.com/o/"+a[0]+"%2F"+a[1]+"?alt=media";
     return "https://firebasestorage.googleapis.com/v0/b/quizapp-f7c4c.appspot.com/o/"+a[0]+"%2F"+a[1]+"?alt=media"
   }


   removequiz(id:string){
     this.qs.deleteQuiz(id)
   }
  
   openDialog(row:any): void {
    let dialogRef = this.dialog.open(ViewdialogComponent, {
      width: '500px',
      height:'500px',
      data: {value:row}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

   
  




}
