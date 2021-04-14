import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Module/admin/admin.component';
import { AddcategoryComponent } from './Module/pages/addcategory/addcategory.component';
import { ShowcategoryComponent } from './Module/pages/addcategory/showcategory/showcategory.component';
import { AddquizComponent } from './Module/pages/addquiz/addquiz.component';
import { EditquizComponent } from './Module/pages/addquiz/editquiz/editquiz.component';
import { ShowquizComponent } from './Module/pages/addquiz/showquiz/showquiz.component';
import { AdminnavComponent } from './Module/pages/navbar/adminnav/adminnav.component';
import { QuizComponent } from './Module/pages/quiz/quiz.component';
import { ResultComponent } from './Module/pages/result/result.component';
import { UserComponent } from './Module/user/user.component';
import { AdminAuthGaurd } from './Services/gaurd/adminauth.gaurd';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthGaurd } from './Services/gaurd/auth.gaurd';
import { NotauthGuard } from './Services/gaurd/notauth.guard';
import { AdminAuuthGaurd } from './Services/gaurd/adminauuth.gaurd';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);


const routes: Routes = [
  {path:'', redirectTo: "/login", pathMatch: 'full' },
  {path:'admin',component:AdminComponent,canActivate:[AdminAuthGaurd]},
  { path: 'login', component: UserComponent, canActivate: [NotauthGuard] },
  { path: 'quiz', component: QuizComponent,  canActivate: [AuthGaurd]},
  { path: 'result', component: ResultComponent ,canActivate:[AuthGaurd]},
  { path: 'addquiz', component: AddquizComponent, canActivate:[AdminAuuthGaurd]},
  { path: 'add', component:AddcategoryComponent,canActivate:[AdminAuuthGaurd]  },
  { path: 'show', component:ShowcategoryComponent,canActivate:[AdminAuuthGaurd]},
  {path:'adminnav',component:AdminnavComponent,canActivate:[AdminAuuthGaurd]},
  { path: 'showquiz', component: ShowquizComponent,canActivate:[AdminAuuthGaurd]  },
  { path: 'editquiz/:id', component: EditquizComponent ,canActivate:[AdminAuuthGaurd] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function redirectUnauthorizedTo(arg0: string[]) {
  throw new Error('Function not implemented.');
}

function redirectLoggedInTo(arg0: string[]) {
  throw new Error('Function not implemented.');
}

