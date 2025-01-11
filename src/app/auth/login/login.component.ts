import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formdata: FormGroup
  public submitted:boolean = false
  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router,private auth:AuthService) {
    this.formdata = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
    sessionStorage.clear()
  }


  submit() {
   this.submitted = true
   if(this.formdata.invalid){
    return
   }
    this.auth.login(this.formdata.value).subscribe(res => {
      if(res.status == 200){
        sessionStorage.setItem("token",res.token)
        sessionStorage.setItem("id",res.data.id)
        this.route.navigate(['/dashboard'])
      }else{
        alert(res.message)
        this.formdata.reset()
      }
    })
  }


    get email() {
      return this.formdata.get('email') as FormControl
    }
    get password() {
      return this.formdata.get('password') as FormControl
    }
}
