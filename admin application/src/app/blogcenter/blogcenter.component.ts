import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteBlogService } from '../service/deleteBlog-service';

@Component({
  selector: 'app-blogcenter',
  templateUrl: './blogcenter.component.html',
  styleUrls: ['./blogcenter.component.css']
})
export class BlogcenterComponent implements OnInit { title = 'blogcenter';
showbutton=false
categorySet:any = ['Application','Accomodation','Visa','Pre Arrival','Post Arrival','Job Search']
blogDetails  : details[]
view : boolean;
noBlogFound = false;
input : string
constructor(private http:HttpClient, private router: Router, private deleteService: deleteBlogService ){}
ngOnInit(): void {
  this.blogDetails = []
}



getBlogListBasedCategory(input)

{
  this.input= input
  let url = 'http://localhost:3000/app/blog/category/'+input;
  this.blogDetails = []
  this.http.get(url).subscribe((data: any[]) => {
      
      data.forEach(res => {
        let detail : details = { id: res._id , body: res.body, blogTopic:res.blogTopic,
          modifiedDate:res.dateModified, createdDate:res.dateCreated };
        this.blogDetails.push(detail)
      });
      if(this.blogDetails.length==0)
      {
        this.noBlogFound = true;
      }else{
        this.noBlogFound = false;
        this.blogDetails=this.blogDetails.reverse()
      }
      });
  }
  createBlog(){
    this.router.navigate(['/createPost']);
  }
  viewBlog(inp){
    this.router.navigate(["/editBlog/:"+inp])    
  }

  deleteBlog(id){
    this.deleteService.deleteBlog(id).subscribe((response)=>{
      if(response["message"] == "Deleted Blog Post!")
      {
        Swal.fire({
          title: 'Blog Deleted Successfully',
          icon: 'success',
        })
      } else{
        Swal.fire({
          title: 'Some error occured',
          icon: 'error',
        })
      }
      this.getBlogListBasedCategory(this.input)
      
    })
  }
}


interface details{
id : String,
body : String,
blogTopic:String,
modifiedDate : Date,
createdDate : Date
}
