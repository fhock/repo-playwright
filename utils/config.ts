import dotenv from 'dotenv';
dotenv.config();

interface Parameters {
    urlLogin: string;
    usernameAdmin: string;
    passwordAdmin: string;
}
  
export const config: Parameters = {
    urlLogin: process?.env?.URL_LOGIN || '',
    usernameAdmin: process?.env?.USERNAME_ADMIN || '',
    passwordAdmin: process?.env?.PASSWORD_ADMIN || ''  
}