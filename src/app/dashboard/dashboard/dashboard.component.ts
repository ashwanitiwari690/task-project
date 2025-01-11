import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public usersdata:any = [];

  constructor(private auth:DashboardService,private route:Router){}

  ngOnInit(): void {
   this.auth.getusers().subscribe(res=>{
    this.usersdata = res.data
   })
  }


  logout(){
    sessionStorage.clear()
    this.route.navigate(['/login'])
  }
}
