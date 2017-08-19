import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IDataProvider from '../../dataProviders/IDataProvider';
import IUser from '../../models/IUser';
import IEmployeeInformation from '../../models/IEmployeeInformation';
import IAchievement from '../../models/IAchievement';
import IPerformanceSkills from '../../models/IPerformanceSkills';

import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import * as AuthenticationContext from 'adal-angular';
import adalConfig from './AdalConfig';
import { IAdalConfig } from './IAdalConfig';
import './WebPartAuthenticationContext';

window.AuthenticationContext = AuthContext;

export class AdalDataProvider implements IDataProvider {
  private _webPartContext: IWebPartContext;
  private authCtx: AuthenticationContext;

  private getGraphAccessToken(): Promise<string> {
    return new Promise<string>((resolve: (accessToken: string) => void, reject: (error: any) => void): void => {
      const graphResource: string = 'https://graph.microsoft.com';
      const accessToken: string = this.authCtx.getCachedToken(graphResource);
      if (accessToken) {
        console.log('ACCESS TOKEN: ' + accessToken);
        resolve(accessToken);
        return;
      }

      if (this.authCtx.loginInProgress()) {
        reject('Login already in progress');
        return;
      }

      this.authCtx.acquireToken(graphResource, (error: string, token: string) => {
        if (error) {
          reject(error);
          return;
        }

        if (token) {
          resolve(token);
        }
        else {
          reject(`Couldn't retrieve access token`);
        }
      });
    });
  }

  private _getUsers(accessToken: string): Promise<IUser[]> {
    const URL = `https://graph.microsoft.com/beta/users`; 

    const requestHeaders: Headers = new Headers(); 
    requestHeaders.append('Accept', 'application/json'); 
    //For an OAuth token 
    requestHeaders.append('Authorization', 'Bearer ' + accessToken); 
    const httpClientOptions: IHttpClientOptions = { headers: requestHeaders };

    return new Promise<IUser[]>(resolve => {
      this._webPartContext.httpClient.get(URL, HttpClient.configurations.v1, httpClientOptions)
        .then((response: HttpClientResponse): Promise<any> => {
          return response.json();
        })
        .then((users): void => {
          return resolve(users);
        })
        .catch(error => {
          console.error(error);
          return Promise.reject(error);
        });
    });
  }

  // private _getUsers(): Promise<IUser[]> {
  //   return new Promise<IUser[]>(resolve => {
  //     return setTimeout(() => resolve(Users), this._msTimeout);
  //   }).catch(error => {
  //     console.error(error);
  //     return Promise.reject(error);
  //   });
  // }

  private _getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return new Promise<IEmployeeInformation[]>(resolve => {
      return setTimeout(() => resolve([]), 500);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  } 

  private _getAchievements(): Promise<IAchievement[]> {
    return new Promise<IAchievement[]>(resolve => {
      return setTimeout(() => resolve([]), 500);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getEarnedAchievements(): Promise<any[]> {
    return new Promise<any[]>(resolve => {
      return setTimeout(() => resolve([]), 500);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  private _getPerformanceSkills(): Promise<IPerformanceSkills[]>{
    return new Promise<any[]>(resolve => {
      return setTimeout(() => resolve([]), 500);
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public getUsers(): Promise<IUser[]> {
    return this.getGraphAccessToken()
    .then(accessToken => {
      return this._getUsers(accessToken);
    });
  }
  
  public getEmployeeInformation(): Promise<IEmployeeInformation[]> {
    return this._getEmployeeInformation();
  }

  public getAchievements(): Promise<IAchievement[]> {
    return this._getAchievements();
  }

  public getEarnedAchievements(): Promise<any[]> {
    return this._getEarnedAchievements();
  }

  public getPerformanceSkills(): Promise<IPerformanceSkills[]>{
    return this._getPerformanceSkills();
  }  
}