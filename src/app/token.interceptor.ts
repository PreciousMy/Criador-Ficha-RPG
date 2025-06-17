import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (localStorage.getItem('token')) {
    const reqClone = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
    console.log('Passei por aqui');

    return next(reqClone);
  }
  
  return next(req);
};
