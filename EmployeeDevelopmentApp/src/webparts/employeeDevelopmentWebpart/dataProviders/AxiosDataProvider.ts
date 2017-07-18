import axios from 'axios';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import IDataProvider from '../dataProviders/IDataProvider';
import IUser from '../models/IUser';
import IEmployee from '../models/IEmployee';

export class AxiosDataProvider implements IDataProvider {
  private _webPartContext: IWebPartContext;

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public getUsers(): Promise<IUser[]> {
    return this._getUsers();
  }

  public getEmployees(users: IUser[]): Promise<IEmployee[]> {
    return this._getEmployees(users);
  }

  private _getEmployees(users: IUser[]): Promise<IEmployee[]> {
    const employees: IEmployee[] = null;

    return new Promise<IEmployee[]>((resolve) => {
      setTimeout(() => resolve(employees), 500);
    });
  }

  //axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  //https://graph.microsoft.com/beta/users?$select=displayName,mail,mobilePhone,jobTitle,officeLocation,department
  private _getUsers(): Promise<IUser[]> {
    const queryString: string = `?$select=displayName,mail,mobilePhone,jobTitle,officeLocation,department`;
    const queryUrl: string = "https://graph.microsoft.com/beta/users/" + queryString;
    
    const token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFCbmZpRy1tQTZOVGFlN0NkV1c3UWZkbG10c1RmVGNKN095RGtHRlhKcG5kNGVheEpEMzZLR0laRWdhY2RhNWJLLUdwaGFSTEJrNHVoLWFmS3JqTzd2RDRreGVXa1Vvc0ozaHAxMWNYcGZ6N0NBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiOUZYRHBiZk1GVDJTdlF1WGg4NDZZVHdFSUJ3Iiwia2lkIjoiOUZYRHBiZk1GVDJTdlF1WGg4NDZZVHdFSUJ3In0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yZDU1ZjIzNC05NDE3LTRkMmYtODA2Ny1lNWZkYjg4ODc2N2IvIiwiaWF0IjoxNTAwMDE5MDk2LCJuYmYiOjE1MDAwMTkwOTYsImV4cCI6MTUwMDAyMjk5NiwiYWNyIjoiMSIsImFpbyI6IlkyWmdZTENwdm5qSk9wRDdTck5jcTlPZnZaUFd4VmxuUEpzOXIwNXNSbW1NM0Y2SlU0WUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkVtcGxveWVlIERldmVsb3BtZW50IEFwcCIsImFwcGlkIjoiNmZiNjZkOWItZGJiYy00ZDkzLTk4ZDMtNmFmZTE0NmZmMWM0IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJEZSBsYSBHYXJ6YSIsImdpdmVuX25hbWUiOiJBcnR1cm8iLCJpcGFkZHIiOiIxODcuMTYzLjEyMC4yMzMiLCJuYW1lIjoiQXJ0dXJvIERlIGxhIEdhcnphIiwib2lkIjoiZTg2OWJmNGItYTgzMi00NWY1LWI3YWEtZWFmM2RiNmFiZWIwIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMzRkZGOTUxOEZCMzgiLCJzY3AiOiJVc2VyLlJlYWQgVXNlci5SZWFkQmFzaWMuQWxsIiwic3ViIjoiZkFQODhnb2NKUmpiZHVpNTZMTXVUYnBHRUNUU09GX3FnNHJsLWVsdjNhbyIsInRpZCI6IjJkNTVmMjM0LTk0MTctNGQyZi04MDY3LWU1ZmRiODg4NzY3YiIsInVuaXF1ZV9uYW1lIjoiQXJ0dXJvQGFnemVydHVjaGUub25taWNyb3NvZnQuY29tIiwidXBuIjoiQXJ0dXJvQGFnemVydHVjaGUub25taWNyb3NvZnQuY29tIiwidXRpIjoiQk4yWW41YWFNRXU4bHJWVGtzd0FBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIl19.aWJevEaiX4zJQNRwo_7mRR7WXlGPnTuzOgmHfAaWkmNw4PuHckd2ItJ9XFZOrD2XJByflUY7mp9dijMKacAxAO7IQlCZFYps0joWuqhzmGu3Xf2iF9bL2MUBMt4HavTjlqUdc8D2FdauTH3RCZ0weuW2dXA-NjZ8xaHo7xAm_a0Xu71SNwd4zY6PRuwXS5PnGdUWVcaMfeXyOzV8R7LtPDOv5Dv-kJnFwP-crZjIQNAYTAZ1rdPdysMXOKvBg4JJZaDfP7hiIE9VHCroL-6Yl4DhRE2OeTTiR1Nj7uFxdMNqsxHXmGET8o0HRSt-2nzWBy6cyD5Ru5U1tINRDvMAHw";

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(queryUrl)
    .then((response: any) => {
      return response.data.value.map((user: IUser) => {
        return user;
      });
    })
    .catch((error: any) => {
      console.error(error);
      return error(() => {        
      });
    });
  }
}