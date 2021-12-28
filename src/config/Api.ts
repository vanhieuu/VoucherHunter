const MainURL = 'https://voucherhunter.herokuapp.com';
const URL = {
  Login: MainURL + '/login',
  ValidateToken: MainURL + `/auth/profile`,
  User: MainURL + `/user`,
  Products: MainURL + `/product`,
  Register: MainURL + `/register`,
  News: (pageNumber: number) => MainURL + `/news?page=${pageNumber}`,
  item: (productID: string) => MainURL + `/product?productID=${productID}`,
  CheckToken: MainURL + `/auth/checkToken`,
  addItemCart: MainURL + '/cart/auth/additem',
  getItemCart: MainURL + '/cart/auth',
  addQuantity: MainURL + '/cart/auth/changeqty',
  removeItem: MainURL + '/cart/auth/removeitem',
  removeAll: MainURL + '/cart/auth/removeall',
  createInvoice: MainURL + '/invoice/auth/create',
  getInvoice: MainURL + '/auth/invoice'
};
export default URL;

