import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    const reqClone = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${accessToken}`
      ),
    });
   
    return next(reqClone);
  }
  
  return next(req);
};
