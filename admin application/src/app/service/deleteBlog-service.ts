import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class deleteBlogService{
    constructor(private http: HttpClient){}
    deleteBlog(id){
        let uri= "http://localhost:3000/app/"+id;
        return this.http.delete(uri)
    }
}