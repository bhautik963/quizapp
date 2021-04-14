import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/Services/model/question.modal';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-showcategory',
  templateUrl: './showcategory.component.html',
  styleUrls: ['./showcategory.component.scss']
})
export class ShowcategoryComponent implements OnInit {
  value:any = [];
  row:any = [];
  constructor(public qs:QuizService) { }

  ngOnInit(): void {

    this.qs.getcategory().subscribe(data=>{
  
      this.row = data

      const filteredData: CategoryModel[]= data.map(val=> { return this.filterData(val.payload.doc.id, val.payload.doc.data());})
      this.row = filteredData
    })
  }





filterData(id:any, data:any) {
  return {
    id: id,
    Title:data.Title,
    Discription:data.Discription
    }
}

}