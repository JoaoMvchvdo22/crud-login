import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserDTO {
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiRestUrl = 'https://todolist-api.edsonmelo.com.br/api';

constructor(private http: HttpClient) { }

  createUser(user: UserDTO): Observable<any> {
    return this.http.post(`${this.apiRestUrl}/user/new/`, user);
  }

  login(user: UserDTO): Observable<any> {
    return this.http.post(`${this.apiRestUrl}/user/login/`, user);
  }

  updateUser(user: UserDTO, auth: string): Observable<any> {
    return this.http.put(`${this.apiRestUrl}/user/update/`, user , { headers: { Authorization: auth } });
  }

  deleteUser(user: UserDTO, auth: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': auth,
    });

    return this.http.delete(`${this.apiRestUrl}/user/delete/`, {
      headers: headers,
      body: user
    });
  }

  createTask(task: any, auth: string): Observable<any> {
    return this.http.post(`${this.apiRestUrl}/task/new/`, task, { headers: { Authorization: auth } });
  }

  getTasks(auth: string): Observable<any> {
    return this.http.post(`${this.apiRestUrl}//task/search/`, {}, { headers: { Authorization: auth } });
  }

  doneTask(task: any, auth: string): Observable<any> {
    return this.http.put(`${this.apiRestUrl}/task/update/`, task, { headers: { Authorization: auth } });
  }

  editTaskId(id: any, auth: string): Observable<any> {
    return this.http.post(`${this.apiRestUrl}/task/edit/`, id, { headers: { Authorization: auth } });
  }

  deleteTask(task: any, auth: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': auth,
    });

    return this.http.delete(`${this.apiRestUrl}/task/delete/`, {
      headers: headers,
      body: task
    });
  }
}
