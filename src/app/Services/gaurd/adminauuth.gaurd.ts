import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
@Injectable({ providedIn: "root" })
export class AdminAuuthGaurd implements CanActivate {
    constructor(private router: Router,private admin:UserService) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.admin.gettokenadmin()) {  
            this.router.navigateByUrl("/admin");  
        }  
        return this.admin.gettokenadmin();  
        }  
    
}