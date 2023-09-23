export const host = "https://localhost:44307/api";
export const authorize = `${host}/Authorization`;
export const addcust = `${host}/Customer/Add`;
export const getcusts = `${host}/Customer/GetAll`;
export const getcustomer = `${host}/Customer/Get/`;
export const updatedetails = `${host}/Customer/UpdateDetails/`;
export const updatecredentials = `${host}/Customer/UpdateCredentials/`;
export const addacc = `${host}/Account/AddAccount`;
export const getaccbyid = `${host}/Account/GetAccountByID/`;
export const getaccbycustid = `${host}/Account/GetAccountByCustomer/`;
export const transaction = `${host}/Transaction`;
export const gettransactionhistory = `${host}/Transaction?id=`;
export const getallcurr = `${host}/Currency/GetAll`;
export const getcurrrate = `${host}/Currency/GetRate/`;
//pin change route shd be added
