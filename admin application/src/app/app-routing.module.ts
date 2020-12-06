import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogcenterComponent } from './blogcenter/blogcenter.component';
import { CreateBlogpostComponent } from './create-blogpost/create-blogpost.component';
import { EditblogPostComponent } from './editblog-post/editblog-post.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path : 'createPost' , component : CreateBlogpostComponent},
  {path:"blogHome", component : BlogcenterComponent},
  {path:"editBlog/:id",component: EditblogPostComponent},

  // {path:'landing',component:LandingComponent},
  {path:'',component: LoginComponent},
  // {
  //   path:'blog',component:BlogComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
