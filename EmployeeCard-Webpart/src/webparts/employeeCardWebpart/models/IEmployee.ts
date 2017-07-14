import IUser from './IUser';

interface IEmployee extends IUser {
  pictureUrl: string,
  isHomeOffice: boolean,
  birthday: string,
  vehicule: string,
  emergencyContacts: string
}

export default IEmployee;