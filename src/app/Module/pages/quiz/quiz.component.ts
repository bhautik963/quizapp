import { Component, OnInit } from '@angular/core';
import { QuizService } from './../../../Services/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionModal } from './../../../Services/model/question.modal';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  selectedAnswer!: number;
  isLoading: Boolean = false;
  users!: Observable<any[]>;
  count!: number;
  temp:any=[];
  constructor(public quizService: QuizService,public us:UserService, public sanitizer: DomSanitizer, public router: Router) { 
    this.getQuizData();

  }

  ngOnInit(): void {
    this.quizService.qnProgress = 0;
    this.quizService.seconds = 0;
  }

 

  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--progress-bar: ${this.getProgressValue}%`);
  }


  public get checkPrev(): Boolean {
    if (this.quizService.qnProgress - 1 >= 0) {
      return true;
    }
    return false;
  }

  geturl(e:any){
    const a = e.split('/')
     return "https://firebasestorage.googleapis.com/v0/b/quizapp-f7c4c.appspot.com/o/"+a[0]+"%2F"+a[1]+"?alt=media"
   }


  public get checkNext(): Boolean {
    if (this.quizService.questionData[this.quizService.qnProgress].participantAnswer >= 0) {
      return true;
    }
    return false;
  }


  public get getProgressValue() {
    const progressValue = (this.quizService.qnProgress + 1) * (100 / this.quizService.questionData.length);
    return progressValue;
  }

  
  filterData(id:any, data:any) {
    return {
      id: id,
      answer: data.answer,
      // imageName: data.imageName,
      options: data.options,
      question: data.question,
      participantAnswer: -1
    }
  }

    
  getQuizData() {
    this.isLoading = true;
    this.us.users().subscribe(
      (res:any) => {
        this.isLoading = false;
        const filteredData: QuestionModal[] = res.map((response:any) => {
          return this.filterData(response.payload.doc.id, response.payload.doc.data());
        })
        this.quizService.questionData = filteredData;
        this.startTimer();
      },
      (err:any) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  radioChange(event: MatRadioChange) {
    this.quizService.questionData[this.quizService.qnProgress].participantAnswer = event.value;
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
    }, 1000)
  }

  clickNextBtn(id:any) {
    if (this.checkNext) {
      this.quizService.qnProgress++;
      if (this.quizService.questionData.length == this.quizService.qnProgress) {
        clearInterval(this.quizService.timer);
        this.router.navigate(['/result']);
        return;
      }
    }
  }


  clickPrevBtn() {
    if (!this.checkPrev) {
      return;
    }
    this.quizService.qnProgress--;
  }

}
