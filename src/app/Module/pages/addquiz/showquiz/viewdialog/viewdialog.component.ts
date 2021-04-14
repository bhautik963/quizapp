import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-viewdialog',
  templateUrl: './viewdialog.component.html',
  styleUrls: ['./viewdialog.component.scss']
})
export class ViewdialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ViewdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private qs:QuizService)
  {
      console.log(data.value.imageName);
      
        
  }

  ngOnInit(){
    
  }

  geturl(e:any){
    const a = e.split('/')
     return "https://firebasestorage.googleapis.com/v0/b/quizapp-f7c4c.appspot.com/o/"+a[0]+"%2F"+a[1]+"?alt=media"
   }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
