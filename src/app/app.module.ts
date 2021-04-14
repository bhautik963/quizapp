import { NgModule } from '@angular/core';
import { BrowserModule,platformBrowser } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import{ReactiveFormsModule,FormsModule} from '@angular/forms';
// import { PortalModule } from '@angular/cdk/portal';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AdminModule } from './Module/admin/admin.module';
// import { UserModule } from './Module/user/user.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuizComponent } from './Module/pages/quiz/quiz.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ResultComponent } from './Module/pages/result/result.component';
import { NavbarComponent } from './Module/pages/navbar/navbar.component';
import { AddquizComponent } from './Module/pages/addquiz/addquiz.component';
import { ShowquizComponent } from './Module/pages/addquiz/showquiz/showquiz.component';
import { AdminnavComponent } from './Module/pages/navbar/adminnav/adminnav.component';
import { EditquizComponent } from './Module/pages/addquiz/editquiz/editquiz.component';
import { AddcategoryComponent } from './Module/pages/addcategory/addcategory.component';
import { ShowcategoryComponent } from './Module/pages/addcategory/showcategory/showcategory.component';
import { AuthGaurd } from './Services/gaurd/auth.gaurd';
import { UserService } from './Services/user.service';
import { QuizService } from './Services/quiz.service';
import { UserComponent } from './Module/user/user.component';
import { AdminComponent } from './Module/admin/admin.component';
import { ViewdialogComponent } from './Module/pages/addquiz/showquiz/viewdialog/viewdialog.component';
const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  // PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultComponent,
    NavbarComponent,
    AddquizComponent,
    ShowquizComponent,
    AdminnavComponent,
    UserComponent,
    AdminComponent,
    EditquizComponent,
    AddcategoryComponent,
    ShowcategoryComponent,
    ViewdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...materialModules,
    FormsModule,
    ReactiveFormsModule,
    // AdminModule,
    // UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxDatatableModule,
 
  ],
  exports:[
    ...materialModules
  ],

  providers: [
    AuthGaurd,
    UserService,
    QuizService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
