import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.quizService.signOut();
  }

}
