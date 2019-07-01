import { Injectable, Inject } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AppSettings } from '../appSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ModalMessageService } from '../custom-components/custom-html-components/modal-message/modal-message-sgee.service';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions, private _appSettings: AppSettings, private router: Router,
        private modalMessageService: ModalMessageService) {
    super(backend, options);
  }

  private setDefaultHeaders(): void {
    // Set the default 'Accept' header
    this._defaultOptions.headers.set('Accept', 'application/json');
    this._defaultOptions.headers.set('Cache-Control', 'no-cache');
    this._defaultOptions.headers.set('Pragma', 'no-cache');

    // Set the authentication token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this._defaultOptions.headers.set('Authorization', 'Bearer ' + currentUser.token);
    }
  }

  private setDefaultHeadersPost(): void {
    // Set the default 'Accept' header
    this._defaultOptions.headers.set('Accept', 'application/json');
    this._defaultOptions.headers.set('Content-Type', 'application/json');

    // Set the authentication token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this._defaultOptions.headers.set('Authorization', 'Bearer ' + currentUser.token);
    }
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setDefaultHeaders();
    return super.get(this._appSettings.getApiEndpoint() + url, options).catch(this.catchRequestError(this));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.setDefaultHeadersPost();
    return super.post(this._appSettings.getApiEndpoint() + url, JSON.stringify(body), options).catch(this.catchRequestError(this));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.setDefaultHeaders();
    return super.put(this._appSettings.getApiEndpoint() + url, body, options).catch(this.catchRequestError(this));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setDefaultHeaders();
    return super.delete(this._appSettings.getApiEndpoint() + url, options).catch(this.catchRequestError(this));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.setDefaultHeaders();
    return super.patch(this._appSettings.getApiEndpoint() + url, body, options).catch(this.catchRequestError(this));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setDefaultHeaders();
    return super.head(this._appSettings.getApiEndpoint() + url, options).catch(this.catchRequestError(this));
  }

  private catchRequestError(self: HttpService) {
    return (res: Response) => {
      const options = new ResponseOptions();
      options.status = res.status;
      switch (res.status) {
        case 0: options.body = 'Os serviços da aplicação estão indisponíveis.'; break;
        case 403:
          this.modalMessageService.notify('Acesso não autorizado',
            'Seu grupo de usuário não permite<br> a ação efetuada.',
            this.navigateToHome.bind(this));
          break;
        default: options.body = res.text();
      }
      res = new Response(options);
      return Observable.throw(res);
    };
  }

  public navigateToHome(){
    this.router.navigate(['/']);
  }
}