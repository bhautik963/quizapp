import { Injectable } from '@angular/core';
import { UserModal } from './model/user.modal';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { QuestionModal } from './model/question.modal';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questionData: QuestionModal[] = [];
  seconds!: number;
  timer:any;
  qnProgress!: number;
  correctAnsCount: number = 0;
  private fields = new BehaviorSubject<any>(null);
  private field$ : AngularFirestoreCollection<any>;

  constructor( private fireStore: AngularFirestore, public router: Router) {
    this.field$ = this.fireStore.collection("quizData");
  }

  get field() {
    return this.field$.valueChanges();
  }

   get selectField():any{
    return this.fields.asObservable();
  }

  set selectField(value) {
    this.fields.next(value);
  }

  // Timer 
  displayTimeElapsed() {
    const hours = Math.floor(this.seconds / 3600) < 10 ? '0' + Math.floor(this.seconds / 3600) : Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds / 60) % 60) < 10 ? '0' + Math.floor((this.seconds / 60) % 60) : Math.floor((this.seconds / 60) % 60);
    const seconds = Math.floor(this.seconds % 60) < 10 ? '0' + Math.floor(this.seconds % 60) : Math.floor(this.seconds % 60);
    return `${hours} : ${minutes} : ${seconds}`;
  }

  getData() {
    return this.fireStore.collection('quizData').snapshotChanges();
  }

  
  createUser(value: UserModal) {
    return this.fireStore.collection('userData').add(value);
  }

  createAdmin(value: UserModal) {
    return this.fireStore.collection('AdminData').add(value);
  }

  addData(value:any) {
   return this.fireStore.collection('quizData').add(value);
  }


  addcategoty(data:any){
   return this.fireStore.collection('category').add(data);
  }

  getcategory(){
    return this.fireStore.collection('category').snapshotChanges();
  }

  getc(){
    return this.fireStore.collection('category').valueChanges();
  }


  sendResult(userId: string, resultData: any) {
    return this.fireStore.collection('userData').doc(userId).update({ "resultData": resultData });
  }

  addresult(data:any){
    console.log(data);
    
    return this.fireStore.collection('resultData').add(data);
  }


  signOut() {
    localStorage.clear();
    clearInterval(this.timer);
    this.router.navigate(['login']);
  }

  signOutadmin() {
    localStorage.clear();
    clearInterval(this.timer);
    this.router.navigate(['admin']);
  }


  getQuizById(id:string){
    return this.fireStore.doc('quizData/'+ id).valueChanges()
  }
 
  
quizUpdate(id:string,data:any){
 return  this.fireStore.collection('quizData').doc(id).update(data);
  
}
  
  deleteQuiz(id: string) {
    return this.fireStore.doc('quizData/' + id).delete();
  }


  deleteCategory(id: string) {
    return this.fireStore.doc('category/' + id).delete();
  }



 
}
