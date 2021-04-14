import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({ providedIn: "root" })
export class AuthGaurd implements CanActivate {
    constructor(private router: Router,private user:UserService) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.user.gettoken()) {  
            this.router.navigateByUrl("/login");  
        }  
        return this.user.gettoken();  
        }   
    }


