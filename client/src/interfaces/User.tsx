/*
{
    "firstName":"Mathias",
    "surName":"Myrold",
    "email":"mattimy99@gmail.com",
    "isAdmin":true,
    "validDate":"2015-03-31",
    "password":"123",
    "phoneNumber":123332
}
*/
export default interface User {
  userId: string;
  firstName: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  validDate: Date;
  phoneNumber: string;
}
