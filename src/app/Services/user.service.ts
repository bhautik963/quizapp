import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuizService } from './quiz.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore,
    private qs: QuizService
  ) {}

   users() {
    return this.qs.selectField.pipe(switchMap((company:any) => {
      return this.afs
        .collection("quizData", ref => {
          let query:any = ref;
          
          if (company) {
            // console.log(company)
            query = query.where("field", "in",company);
          }
          return query;
        })
        .snapshotChanges();
    }));
  }


  gettoken(){  
    return !!localStorage.getItem("sessionUser");  
    } 
    
    gettokenadmin(){  
      return !!localStorage.getItem("sessionAdmin");  
      } 
}
