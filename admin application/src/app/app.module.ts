import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { AppRoutingModule } from './app-routing.module';
import { BlogcenterComponent } from './blogcenter/blogcenter.component';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipe/limitTo';
import { CreateBlogpostComponent } from './create-blogpost/create-blogpost.component';
import { EditblogPostComponent } from './editblog-post/editblog-post.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogcenterComponent,
    CreateBlogpostComponent,
    TruncatePipe,
    EditblogPostComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    QuillModule.forRoot(),    
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
