/*
email: "hansw0701@gmail.com"
firstName: "William"
isAdmin: "false"
password: "615a8104f234894d78fbbb7e79ccc208c4f89e4da13a2b8790020729a2df31d3a0e9184cb7e756d3101b1eb6f0247a8bed80014f0912970e91d9441e61ddaf65"
phoneNumber: "41744440"
surname: "Forbrigd"
userId: 258600161
validDate: "2021-10-28"
*/
export default interface User {
  userId: number;
  firstName: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  validDate: string;
  phoneNumber: string;
}
