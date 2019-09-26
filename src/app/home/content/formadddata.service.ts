import { Injectable } from '@angular/core';
import { FormAddData } from '../../interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';

import { catchError, tap , map} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-type' : 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormadddataService {

  // private dataurl: string = 'http://localhost:3000/datafake';
  private dataurl: string = 'https://protected-river-59450.herokuapp.com/todo';
  constructor(private http: HttpClient) {

  }
  getdata(): Observable<FormAddData[]> {
      return this.http.get<FormAddData[]>(this.dataurl)
  }
  // ErrorHandler(error: HttpErrorResponse){
  //   return throwError(error.message || "Lỗi Server")
  // }
  postdata(newinfo: FormAddData): Observable<FormAddData> {
    return this.http.post<FormAddData>(this.dataurl,newinfo, httpOptions)
                    .pipe(
                      tap(data => {console.log("Đã Thêm Mới")}),
                      catchError(error => of(null))
                    )
  }
  deletedata(iditem: number): Observable<FormAddData> {
    const url:string = `${this.dataurl}/${JSON.stringify(iditem)}`;
    console.log(url);
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(data => console.log(`data = ${JSON.stringify(data)}`)),
      catchError(error => of(null))
    );
  }
  deleteall():Observable<any>{
    const link: string = `${this.dataurl}/all`;
    console.log(`${JSON.stringify(link)}`);
    
    return this.http.delete<FormAddData>(link, httpOptions).pipe(
      tap(data => console.log(`data = ${JSON.stringify(data)}`)),
      catchError(error => of(null))
    );
  }
  deleteselect(listtodo: number[]):Observable<any>{
    const list: string = JSON.stringify(listtodo)
    const link: string = `${this.dataurl}/multiple?listId=${list.slice(1,list.length - 1).replace(/,/g,"%2C")}`;
    console.log(link);
    console.log(JSON.stringify(listtodo));
    // return null;
    return this.http.delete<FormAddData>(link).pipe(
      tap(data => console.log(`deleted`)),
      catchError(error => {console.log(`error`); return of(null)})
    );
  }
  updatedata(newdata: FormAddData, danhsachid: number): Observable<FormAddData> {
    const urlput = `${this.dataurl}/${danhsachid}`;
    console.log(urlput);
    return this.http.put<FormAddData>(urlput, newdata, httpOptions)
                    .pipe(
                      tap(data => {console.log("Sửa Thành Công")}),
                      catchError(error => of(null))
                    )
    
  }
}
