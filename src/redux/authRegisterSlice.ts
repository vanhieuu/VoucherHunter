import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EGender, EStatusAuth, IAdress } from "./authSlice";


export interface IDataRegister{
    username:string;
    email:string;
    displayName:string;
    gender:EGender;
    phone:string;
    address:IAdress;
    photoUrl:string;
    
  }
  export interface IUserRegister {
    userName: string;
    email: string;
    phone: string;
    photoUrl: string;
    displayName: string;
    gender: EGender;
    dob: string;
    address: IAdress;
  }
  export interface IAuthRegister{
    user: IDataRegister;
    accessToken: string;
    statusAuth: EStatusAuth;
    message: string;
  }
  const initValue:IAuthRegister = {
        user: {
            username:'',
            email:'',
            phone:"",
            displayName:"",
            gender:1,
            photoUrl:"",
            address:{
                city:'',
                district:'',
                ward:"",
                detail:""
            },
        },
        message:'',
        accessToken:"",
        statusAuth: EStatusAuth.check,
        
  }
  export interface IResUserRegister {
    success:boolean,
    message:'',
    user:IUserRegister;
  }
  export const authRegisterSlice = createSlice({
    name:"register",
    initialState: initValue,
    reducers:{
      onRegister:(state,action:PayloadAction<IAuthRegister>)=>{
        state.user = action.payload.user;
        state.accessToken= action.payload.accessToken;
        state.message= action.payload.message;
      }
    }
  })
  export const saveAuthAsync = (auth: IAuthRegister) => {
    try {
      AsyncStorage.setItem('VoucherHunter', JSON.stringify(auth));
    } catch (e) {
      // saving error
    }
  };
  
  export const getAuthAsync = async () => {
    try {
      const auth = await AsyncStorage.getItem('VoucherHunter');
      if (auth) {
        return JSON.parse(auth);
      }
      return null;
    } catch (e) {
      // error reading value
      return null;
    }
  };
  export const {onRegister} = authRegisterSlice.actions
  export default authRegisterSlice.reducer