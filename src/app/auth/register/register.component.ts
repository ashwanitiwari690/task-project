import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registeruser: FormGroup
  public submitted: boolean = false
  public confirmmatch:boolean = false
  constructor(private fb: FormBuilder,private serv:AuthService,private route:Router) {
    this.registeruser = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['',[Validators.required]]
    })
  }


  saveusers() {
   this.submitted = true;
   if(this.registeruser.invalid){
    return
   }
   if(this.confirmmatchpassword()){
    this.confirmmatch = false
    this.serv.saveuser(this.registeruser.value).subscribe(res=>{
     if(res.status == 200){
      this.registeruser.reset()
      alert(res.message)
      this.route.navigate(['/login'])
     }else{
      alert(res.message)
     }
    })
   }else{
    this.confirmmatch = true
   }
  }


confirmmatchpassword(){
 return this.registeruser.value.password == this.registeruser.value.confirmpassword
}

  get firstname() {
    return this.registeruser.get('firstname') as FormControl
  }
  get lastname() {
    return this.registeruser.get('lastname') as FormControl
  }
  get email() {
    return this.registeruser.get('email') as FormControl
  }
  get contact() {
    return this.registeruser.get('contact') as FormControl
  }
  get password() {
    return this.registeruser.get('password') as FormControl
  }
  get confirmpassword() {
    return this.registeruser.get('confirmpassword') as FormControl
  }

}
