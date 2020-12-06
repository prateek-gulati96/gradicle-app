import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { blogSchema } from '../interfaces/blogSchema';
import { createBlogService } from '../service/createBlog-service';
import { editBlogService } from '../service/editBlog-service';

@Component({
  selector: 'app-create-blogpost',
  templateUrl: './create-blogpost.component.html',
  styleUrls: ['./create-blogpost.component.css']
})
export class CreateBlogpostComponent implements OnInit {
  title = 'createpost';
  message;
  thumb:any;
  blogDetailsForm : any;
  imageError = false;
  editBlogDetails : blogSchema;
  categorySet:any = ['--select category--','Application','Accomodation','Visa','Pre Arrival','Post Arrival','Job Search']
  subCategorySet:any = ['--select subCategory--','GRE/GMAT','Application','I20','Flight Information','Packing List', 'First 2 weeks', 'Bank Account', 'LinkedIn']
  id: String;
  verify: boolean = false;
  imgURL: string | ArrayBuffer;
  imgShow : boolean;
  imagePath: any;
  blogData : blogSchema[] = [];
  blog
  videoUrl: any;
  
  constructor( private formBuilder: FormBuilder, private createBlogService: createBlogService,private editBlogservice: editBlogService, private router : Router,private _Activatedroute:ActivatedRoute,private _DomSanitizationService: DomSanitizer)
  {}
  ngOnInit(){
    this.blogDetailsForm = this.formBuilder.group({

      blogTopic: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('', [Validators.required]),
      subcategory: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
      videoURL: new FormControl('', Validators.required),
      blogImage: new FormControl('')
  
  
      });
}
  
 
set2(uri) {
  this.videoUrl = this._DomSanitizationService.bypassSecurityTrustResourceUrl(uri.value);
  this.verify = true;
}
 

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported";
      this.imgShow = false
      this.imageError = true
      return;
    }else{
      this.imageError = false
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.imgShow = true
    }
  }
  //call this method in input file on selection of file
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogDetailsForm.get('blogImage').setValue(file);
    }
  }
  routeHome(){
    this.router.navigate(["/blogHome"])
  }

  successNotification(){
    Swal.fire({
        title: 'Blog Added Successfully',
        text: 'Do you want to create another blog post?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.imgShow = false
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.routeHome();
        }
      })
    }

  onSubmit(blogRequest : NgForm){

    const formData = new FormData();
    formData.append("blogTopic",this.blogDetailsForm.controls.blogTopic.value);
    formData.append("category",this.blogDetailsForm.controls.category.value);
    formData.append("subcategory",this.blogDetailsForm.controls.subcategory.value);
    formData.append("body",this.blogDetailsForm.controls.body.value);
    formData.append("videoURL",this.blogDetailsForm.controls.videoURL.value);
    formData.append('blogImage', this.blogDetailsForm.get('blogImage').value);

    try {
   
      this.createBlogService.createPostService(formData)
      this.blogDetailsForm.reset()
      this.verify= false;
      this.imgShow = false;
      this.successNotification();

    } catch (error) { 
      Swal.fire(
        'Oops!',
        "Some error occured",
        'error'
      )
    }
    
  }
}
