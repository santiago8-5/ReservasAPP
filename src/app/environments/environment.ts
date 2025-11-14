export const localhost: string = 'http://localhost';
export const enviroment = {
  apiUrl: localhost.concat(':8090/api/'),
  authUrl: localhost.concat(':9000/api/login'),
  apiUsers: localhost.concat(':9000/admin/usuarios'),
};
