import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Defina as rotas que NÃO devem receber o token
  const publicRoutes = [
    '/auth/users/',      // Cadastro
    '/auth/jwt/create/'  // Login
  ];

  // Verifique se a requisição é para uma rota pública
  const isPublicRoute = publicRoutes.some(route => req.url.includes(route));

  // Se for uma rota pública, envie a requisição original sem o token
  if (isPublicRoute) {
    return next(req);
  }
  
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
