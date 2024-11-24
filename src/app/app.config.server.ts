import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from '../api/error-interceptor/error-interceptor.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService, multi:true}
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
