import {createTheme} from '@shopify/restyle';
import { Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

const theme = createTheme({
  colors: {
    dots: '#d0d0d0',
    primary: '#E9707D',
    title: '#0c0d34',
    text: 'rgba(12,13,52,0.7)',
    white: '#fff',
    grey: 'grey',
    secondary:'#000',
    danger:'#ff6659',
    green:'green',
    orange:'#fe5e33',
    lightBlue:'#bfeaf5',
    primaryLight:'#e7f9f7',
    info:'#808080',
    lightPrimary:'#ffcdd2'
    

  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii:{
    s:4,
    m:10,
    l:25,
    xl:75
  },
  textVariant: {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    button:{
      fontSize: 15,
      lineHeight: 24,
      color: 'text',
    }
  },
});


export const aspectRatio = width/375
export type Theme = typeof theme;
export default theme;
