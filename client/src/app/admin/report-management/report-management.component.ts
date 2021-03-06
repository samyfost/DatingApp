import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  users: Partial<User[]>;
  members:Partial<Member[]>;
  predicate='reported';
  pageNumber=1;
  pageSize=5;
  pagination: Pagination;

  constructor(private adminService: AdminService,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
this.loadReports();
  }
  loadReports()
  {
    this.adminService.getReports(this.predicate,this.pageNumber,this.pageSize).subscribe(response =>{
      console.log(response);
      this.members=response.result;
      this.pagination= response.pagination;
      
    })
    
  }
  pageChanged(event: any)
  {
    this.pageNumber=event.page;
    this.loadReports();
  }
  deleteReport()
  {
    this.toastr.success('You have deleted the report!');
    setTimeout(() => {
      this.router.navigate(["/members"]);
    }, 2000);

  
  }

}
