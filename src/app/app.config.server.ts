import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    //{provide:HTTP_INTERCEPTORS,useClass:JwtApiService,multi:true},
    //{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorApiService, multi:true}
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
