import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { blogSchema } from '../interfaces/blogSchema';
import { createBlogService } from './createBlog-service';
import { deleteBlogService } from './deleteBlog-service';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root',
   })
export class editBlogService{
    

    constructor(private http:HttpClient, private deleteBlogService : deleteBlogService, private createPost : createBlogService){
    }
   
    getBlogPostService(inp){
    
        let uri = environment.baseURL+inp;
        return this.http.get(uri);
    }

    updateBlogPost(id,request : blogSchema ){
        
        let uri = environment.baseURL+id;
        
        return this.http.patch(uri, request)
    }
    updateWithImageBlog(id,newBlogData){
        this.deleteBlogService.deleteBlog(id).subscribe((data)=>{
            if(data["message"]=="Deleted Blog Post!")
            {
              this.createPost.createPostService(newBlogData)
            }
        });
    }
}
