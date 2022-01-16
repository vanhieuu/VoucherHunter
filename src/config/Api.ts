const MainURL = 'https://voucherhunter.herokuapp.com';
// const MainURL = 'http://192.168.0.104:4000'
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
  getInvoice: MainURL + '/auth/invoice',
  changePassword: MainURL + '/auth/changepwd',
  getNewByTag: (tag: string, page: 1) =>
    MainURL + `/news/by-tag/search?tag=${tag}&page=${page}`,
  getItemByTag: (tag: string, page: 1) =>
    MainURL + `/product/by-tag/search?tag=${tag}&page=${page}`,
};
export default URL;
