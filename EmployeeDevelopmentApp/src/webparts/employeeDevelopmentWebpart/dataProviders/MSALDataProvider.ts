import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient } from "@microsoft/sp-http";
import { UserAgentApplication } from 'msalx';
import IDataProvider from '../dataProviders/IDataProvider';
import IUser from '../models/IUser';
import IEmployee from '../models/IEmployee';
import IAchievement from '../models/IAchievement';
import IEmployeeInformation from '../models/IEmployeeInformation';
import IPerformanceSkills from '../models/IPerformanceSkills';

/**
 * MSAL Config - Register your app here: https://apps.dev.microsoft.com/
 */
const msalconfig = {
    clientID: "6fb66d9b-dbbc-4d93-98d3-6afe146ff1c4", // Azure AD Application
    redirectUri: location.origin,
    scopes: ["User.Read", "Sites.Read.All"]
};

export class MSALDataProvider implements IDataProvider {
  private _users: IUser[];
  private _achievements: IAchievement[];
  private _employeeInformation: IEmployeeInformation[];
  private _earnedAchievements: any[];
  private _performanceSkills: IPerformanceSkills[];
  private _webPartContext: IWebPartContext;
  private _clientApplication: UserAgentApplication;

  constructor() {
    this._users = [];
    this._achievements = [];
    this._earnedAchievements = [];
    this._performanceSkills = [];
    this._employeeInformation = [];

    // Initialize the user agent application for MSAL
    if (!this._clientApplication) {
      this._clientApplication = new UserAgentApplication(msalconfig.clientID,
        null, (errorDesc, token, error, tokenType) => {
        // Called after loginRedirect or acquireTokenPopup
      });
    }

    if (this._clientApplication.getUser()) {
      // this._getAccessToken();
    } else {
      this._clientApplication.loginPopup(msalconfig.scopes).then((idToken: string) => {
        // this._getAccessToken();
      });
    }  
  }

  private _groupByArray(xs, key) { 
    return xs.reduce((rv, x) => { 
      let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); 
      if (el) { 
        el.values.push(x); 
      } else {
        rv.push({
          key: v, values: [x] }); 
        } 
        return rv; 
      },
    []); 
  } 

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  private _getUsersPhotos(token, users){
    let promises = users.map((u) => {
      return this._tryGetUserPhoto(token, u);
    });

    return Promise.all(promises);
  }

  private _tryGetUserPhoto(token, user) {
    return this._webPartContext.httpClient.get(`https://graph.microsoft.com/beta/users/${user.userPrincipalName}/photo/$value`, HttpClient.configurations.v1, {
      headers: {
        "authorization": `Bearer ${token}`
      },          
    })
    .then((response) => {
      if (!response.ok) {
        throw "Photo not found for user: ";
      }

      return response.blob();
    })
    .then(image => {      
      user.imageUrl = window.URL.createObjectURL(image);
      return user;
    })
    .catch(error => {
      console.error(error, user.userPrincipalName);
      return user;
    });
  }

  public getUsers(): Promise<IUser[]> {
    return this._clientApplication.acquireTokenSilent(msalconfig.scopes).then((token: string) => {
      return this._getUsers(token);
    }, (error) => {
      // Interaction required
      if (error) {
        this._clientApplication.acquireTokenPopup(msalconfig.scopes).then((token: string) => {
          return this._getUsers(token);
        }, (err: string) => {
          // Something went wrong
          console.error(err);
          return Promise.reject(err);
        });
      }
    });
  }

  private _getUsers(token): Promise<IUser[]>{
     // Call the Microsoft Graph
    return this._webPartContext.httpClient.get('https://graph.microsoft.com/beta/users/', HttpClient.configurations.v1, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw response.statusText;
      } 
      return response.json();     
    })
    .then(result => {
      return this._getUsersPhotos(token, result.value)
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  private _getUser(upn): IUser{
    const user = this._users.filter((u) => {
      if(u.userPrincipalName == upn){
        return u;
      }
    });

    return user.length > 0 ? user[0] : null;
  }

  public getEmployees(users: IUser[]): Promise<IEmployee[]> {
    return this._clientApplication.acquireTokenSilent(msalconfig.scopes).then((token: string) => {
      return this._getEmployees(token, users).then();
    }, (error) => {
      // Interaction required
      if (error) {
        this._clientApplication.acquireTokenPopup(msalconfig.scopes).then((token: string) => {
          return this._getEmployees(token, users).then();
        }, (err: string) => {
          // Something went wrong
          console.error(err);
          return Promise.reject(err);
        });
      }
    });
  }

  private _getEmployeeInformation(token, user) {
    // Call the Microsoft Graph
    //this._webPartContext.pageContext.site.id
    //https://graph.microsoft.com/beta/sites/agzertuche.sharepoint.com:/teams/NewTeamSite:/lists/employees/items?$expand=fields & $filter=fields/userPrincipalName eq 'arturo@agzertuche.onmicrosoft.com' or fields/userPrincipalName eq 'asdf'
    //https://graph.microsoft.com/beta/sites/{hostname},{spsite-id},{spweb-id}/
    return this._webPartContext.httpClient.get(`https://graph.microsoft.com/beta/sites/agzertuche.sharepoint.com:/teams/NewTeamSite:/lists/employees/items?expand=fields & $filter=fields/userPrincipalName eq '${user.userPrincipalName}'`, HttpClient.configurations.v1, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw response.statusText;
      } 
      return response.json();
    })
    .then((result) => {
      if (!result.value[0]) {
        throw "Couldn't get employee information";
      }
      return result.value[0].fields;
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });    
  }

  private _getEmployees(token, users) {
    let promises = users.map((u) => {    
      return this._getEmployeeInformation(token, u)
      .then(ei => {
        return {
            ...u,
            ...ei,
            achievements: this._getEmployeeAchievements(u.userPrincipalName),
            performanceSkills: this._getEmployeePerformanceSkills(u.userPrincipalName)
          };
      });
    });    

    return Promise.all(promises);
  } 

  private _getEmployeePerformanceSkills(userPrincipalName: string): IPerformanceSkills[] {
    debugger;
    return this._performanceSkills.filter(ps => ps.userPrincipalName == userPrincipalName);
  }

  private _getEmployeeAchievements(userPrincipalName: string): IAchievement[] {
    debugger;
    const earnedAchievements = this._earnedAchievements.filter(a => a.userPrincipalName == userPrincipalName);
    
    return this._achievements.filter((a) => {
      return earnedAchievements.some(x => x.id == a.id);
    });
  }

  public getAchievements(): Promise<IAchievement[]> {
    return this._getAchievements();
  }

  private _getAchievements(): Promise<IAchievement[]> {
    return new Promise<IAchievement[]>((resolve) => {
      setTimeout(() => resolve(this._achievements), 500);
    });
  }

  private _getAchievement(achievementId): IAchievement{
    const achievement = this._achievements.filter((a) => {
      if(a.id == achievementId){
        return a;
      }
    });

    return achievement.length > 0 ? achievement[0] : null;
  }

  public getMostCompletedAchievements(): Promise<IAchievement[]>{
    let groupedBy = this._groupByArray(this._earnedAchievements, 'achievementId').sort((a,b) => {
      return b.values.length - a.values.length;
    });

    let achievements: IAchievement[] = groupedBy.map((x) => {
      return this._getAchievement(x.key);
    });
    
    return new Promise<IAchievement[]>((resolve) => {
      setTimeout(() => resolve(achievements), 500);
    });
  }

  public getTrendingAchievements(): Promise<IAchievement[]>{
    let groupedBy = this._earnedAchievements.sort((a,b) => {
      return b.id - a.id;
    });
    
    let achievements: IAchievement[] = groupedBy.map((x) => {
      return this._getAchievement(x.achievementId);
    });
    
    return new Promise<IAchievement[]>((resolve) => {
      setTimeout(() => resolve(achievements), 500);
    });
  }

  public getTopAchievers(): Promise<IUser[]>{
    let groupedBy = this._groupByArray(this._earnedAchievements, 'userPrincipalName').sort((a,b) => {
      return b.values.length - a.values.length;
    });

    let users: IUser[] = groupedBy.map((x) => {
      return this._getUser(x.key);
    });
    
    return new Promise<IUser[]>((resolve) => {
      setTimeout(() => resolve(users), 500);
    });
  }

  public getPerformanceSkills(): Promise<IPerformanceSkills[]>{
    return this._getPerformanceSkills();
  }

   private _getPerformanceSkills(): Promise<IPerformanceSkills[]>{
    return new Promise<IPerformanceSkills[]>((resolve) => {
      setTimeout(() => resolve(this._performanceSkills), 500);
    });
  }
}