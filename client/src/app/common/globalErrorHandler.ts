import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AxiosError } from 'axios';
import { GlobalStateService } from '../global.state';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private readonly globalStateService: GlobalStateService,
  ) { }

  handleError(error: Error | HttpErrorResponse) {

    console.error(error);
    if (error instanceof AxiosError) {
      console.log('error.status', error.status);
      console.log('error.code', error.code);
      if (error.code === '401') {
        this.globalStateService.setUnAuthorized();
      }
    }
  }
}
