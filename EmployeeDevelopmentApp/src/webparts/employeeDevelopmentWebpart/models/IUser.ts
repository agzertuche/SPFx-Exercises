interface IUser {
  id: string;
  displayName: string;
  mail: string;
  mobilePhone: string;
  jobTitle: string;
  officeLocation: string;
  department: string;
  companyName: string;
  city: string;
  country: string;
  userPrincipalName: string;
  imageUrl?: string;
}

export default IUser;