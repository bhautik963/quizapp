export class QuestionModal {
    constructor(
        
        public id: string,
        public answer: number,
        public imageName: string,
        public options: string[],
        public question: string,
        public participantAnswer: number) { }
}

export class CategoryModel {
    constructor(
        
        public id: string,
        public Title:string,
        public Discription:string) { }
}