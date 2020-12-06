import { HttpClient } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable, ɵConsole } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
   })
   
export class createBlogService{

    constructor(private http:HttpClient){
    }
   


    createPostService(bgPost){
        console.log(bgPost)
        let uri = 'http://localhost:3000/app'
        this.http.post(uri,bgPost).subscribe(
            (res) => {
                console.log(res)
            },
            (err) => {
                 console.log(err)
            }
          );
        
          
    }
}
