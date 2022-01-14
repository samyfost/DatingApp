import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  
   }
   getUsersWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
   }

   updateUserRoles(username: string,roles: string[])
   {
     return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
   }
   addReport(username: string) {
    return this.http.post(this.baseUrl+ 'reports/' + username,{})
  }
  getReports(predicate: string, pageNumber,pageSize)
  {
    let params = getPaginationHeaders (pageNumber,pageSize)
    params = params.append('predicate',predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl+ 'reports', params, this.http);
  }
}
