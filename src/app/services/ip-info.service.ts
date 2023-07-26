import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpInfoService {
  private readonly apiKey = environment.getIp;
  
  constructor(private http: HttpClient,
  ) { }

  getIpInfo(): Observable<any> {
    return this.http.get<any>(this.apiKey);
  }
}
