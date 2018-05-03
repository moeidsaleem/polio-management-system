import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
  }

logOut(){
  localStorage.removeItem('uid');
  this.router.navigate(['/landing'])
  
}

  sidebar=[
    {icon:'dashboard', url:'/dashboard/home', text:'Dashboard'},
    {icon:'person', url:'/dashboard/profile', text:'Profile'},
    // {icon:'local_pharmacy', url:'/dashboard/vaccines', text:'Vaccines'},
    // {icon:'local_hospital', url:'/dashboard/doctors', text:'Doctors'},
    // {icon:'wc', url:'/dashboard/guardians', text:'Guardians'},
    {icon:'nature_people', url:'/dashboard/workers', text:'Workers'},
    // {icon:'exit_to_app', url:'/dashboard/logout', text:'Logout'},
  ]
}
