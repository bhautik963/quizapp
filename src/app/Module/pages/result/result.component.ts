import { Component, OnInit } from '@angular/core';
import { QuizService } from './../../../Services/quiz.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  // resultAnswers:Array<any>[] = [];
  rows?:[]
  hello = 'helloguys'
  userDetails: any;
  data:any;
  isSubmitted: boolean = false;

  constructor(public quizService: QuizService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.quizService.correctAnsCount = 0;
    this.getProfileDetails();
    this.getAnswers();
this.filteredResult();

  }

  getProfileDetails() {
    this.userDetails = JSON.parse(localStorage.getItem('userData')!);
  }

  getAnswers() {
    if (this.quizService.questionData) {
      this.quizService.questionData.filter(question => {
        if (question.answer === question.participantAnswer) {
          this.quizService.correctAnsCount++;

        }
      })
    }
  }

  openSnackbar(message:string) {
    this._snackBar.open(message, 'close', {
      duration: 3000
    });
  }

  filteredResult():any {
    if (this.quizService.questionData.length) {
      const userId = this.userDetails.id;
      const username = this.userDetails.name
      const questionData = this.quizService.questionData;
      const timeTaken = this.quizService.displayTimeElapsed();
      const score = this.quizService.correctAnsCount * 10;
      if (userId && questionData.length && timeTaken && score >= 0) {
        const finalData = {
           username:username,
          userid:userId,
          time: timeTaken,
          questionData: questionData,
          score: score + '/' + (this.quizService.questionData.length * 10)
        }
        return  {userId,finalData}
      }
      else {
        return null;
      }
    }
  }


   submit(): any{
    this.isSubmitted = true;
    const filteredData:any = this.filteredResult();
    if (!filteredData) {
      this.isSubmitted = false;
      return null;
    }
    console.log(filteredData.finalData);
    // console.log(this.rows);
     this.quizService.sendResult(filteredData.userId,filteredData.finalData)
   //this.quizService.addresult(filteredData.finalData)
      .then(() => {
        this.openSnackbar('You results are submitted!!');
        this.isSubmitted = false;
      })
      .catch(err => {
        this.openSnackbar(err.message);
        this.isSubmitted = true;
      });
  }

  retry() {
    this.router.navigate(['login']);
  }

}
