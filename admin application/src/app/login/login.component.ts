import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password : new FormControl('', [Validators.required])
    });

  errorMessage = false;
  constructor(private http:HttpClient,private router: Router, private readonly formBuilder : FormBuilder) {  }
  
  

  ngOnInit() {
  }

  onSubmit(loginDetails){

    
    const formData = new FormData();
    formData.append("username",this.loginForm.controls.username.value);
    formData.append("password",this.loginForm.controls.password.value);
    this.http.post("http://localhost:3000/app/login",loginDetails).subscribe((data)=>{

    if(data["message"]=="Login Successful") {
      this.router.navigate(['/blogHome']);
    }
    else
    {
      this.errorMessage=true
    }

    })

  }

}
