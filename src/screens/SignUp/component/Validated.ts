

export interface Props{
 email:string
}

export const validateIsEmail = ({email}:Props) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}