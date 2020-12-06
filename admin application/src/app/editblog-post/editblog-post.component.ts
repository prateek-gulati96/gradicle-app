import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { blogSchema } from '../interfaces/blogSchema';
import { createBlogService } from '../service/createBlog-service';
import { deleteBlogService } from '../service/deleteBlog-service';
import { editBlogService } from '../service/editBlog-service';

@Component({
  selector: 'app-editblog-post',
  templateUrl: './editblog-post.component.html',
  styleUrls: ['./editblog-post.component.css']
})
export class EditblogPostComponent implements OnInit {
  id: String;
  categorySet:any = ['Application',"Accomodation",'Visa','Pre Arrival','Post Arrival','Job Search']
  subCategorySet:any = ['GRE/GMAT','I20','Flight Information','Packing List', 'First 2 weeks', 'Bank Account', 'LinkedIn']
  imageUpdate1 : boolean
  imageUpdate2 : boolean
  dateCreated : Date
  blogdata : blogSchema
  imgURL: string | ArrayBuffer;
  imageError = false;
  thumb
  message
  imagePath
  verify : boolean;
  blogDetailsForm = this.formBuilder.group({
          blogTopic: new FormControl('', [Validators.required, Validators.minLength(3)]),
          category: new FormControl('', [Validators.required]),
          subcategory: new FormControl('', [Validators.required]),
          body: new FormControl('', Validators.required),
          videoURL: new FormControl('', Validators.required),
          blogImage: new FormControl('')
    });
  videoUrl: any;
  imgShow: boolean;
  

  constructor(private formBuilder : FormBuilder,private _DomSanitizationService: DomSanitizer,private router : Router ,private _Activatedroute: ActivatedRoute,private editBlogservice : editBlogService, private spinner: NgxSpinnerService,private deleteService:deleteBlogService, private createService : createBlogService) { }

  ngOnInit(): void {
    
    this.id= this._Activatedroute.snapshot.paramMap.get("id").substring(1);
    
    if (this.id !=null)
    {
        this.spinner.show()
        this.editBlogservice.getBlogPostService(this.id).toPromise().then(
        (res:blogSchema)=>
        {
            this.imgURL= "http://localhost:3000/"+res.image;       
            this.dateCreated = res.dateCreated
            this.imagePath =res.image
              this.blogDetailsForm.setValue({
              blogTopic: res.blogTopic,
              category: res.category,
              subcategory: res.subcategory,
              body: res.body,
              videoURL: res.videoURL,
              blogImage: this.imgURL,
            })
        })
         setTimeout(() => {
           this.spinner.hide();
           }, 900);
    }
  }

  routeHome(){
    this.router.navigate(["/blogHome"])
  }

  set2(uri) {
    this.videoUrl = this._DomSanitizationService.bypassSecurityTrustResourceUrl(uri.value);
    this.verify = true;
  }

  onSubmit(blogRequest : blogSchema){
    if( this.imageUpdate2 ==true && this.imageUpdate1 == true){
      const formData = new FormData();

      try {
        formData.append("blogTopic",this.blogDetailsForm.controls.blogTopic.value);
        formData.append("category",this.blogDetailsForm.controls.category.value);
        formData.append("subcategory",this.blogDetailsForm.controls.subcategory.value);
        formData.append("body",this.blogDetailsForm.controls.body.value);
        formData.append("videoURL",this.blogDetailsForm.controls.videoURL.value);
        formData.append('blogImage', this.blogDetailsForm.get('blogImage').value);
        this.editBlogservice.updateWithImageBlog(this.id,formData)
        this.updateSuccessNotification();
  
      } catch (error) {
        alert("Some error occurred")
      }      
    
    }
    else
    {
      blogRequest.dateCreated = this.dateCreated;
      blogRequest.image = this.imagePath;
      try 
      {
        this.editBlogservice.updateBlogPost(this.id, blogRequest).subscribe((res) => 
        {
          if(res["message"]=="Sucessfully Updated blog")
          {
            this.updateSuccessNotification();
          }
        })
      }catch (error) 
        { 
          alert("Unexpected Error Occured")
        }
      }
  }

  // preview image
  preview(files) {
    this.imageUpdate1 = true
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
    }
  }
  //call this method in input file on selection of file
  onFileSelect(event) {
    this.imageUpdate2 = true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogDetailsForm.get('blogImage').patchValue(file);
    }
  }
  updateSuccessNotification(){
    Swal.fire({
      title: 'Blog Updated Successfully',
      icon: 'success',
    }).then(
      (result)=>{
        if(result.value)
        this.router.navigate(["/blogHome"])
                }
      )

  } catch (error) { 
    Swal.fire(
      'Oops!',
      "Some error occured",
      'error'
            )
  }
}
