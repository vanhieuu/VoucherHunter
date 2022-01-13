import {Typography} from 'react-native-ui-lib';

const FONTS_BASE = 'Avenir';
export const FONTS = {
  Heavy: `${FONTS_BASE}-Heavy`,
  Medium: `${FONTS_BASE}-Medium`,
  Book: `${FONTS_BASE}-Book`,
  Roman: `${FONTS_BASE}-Roman`,
  Light: `${FONTS_BASE}-Light`,
};

Typography.loadTypographies({
  h8: {fontSize: 8,   fontFamily: FONTS.Heavy},
  h13: {fontSize: 13,  fontFamily: FONTS.Heavy},
  h15: {fontSize: 15,   fontFamily: FONTS.Heavy},
  h16: {fontSize: 16,   fontFamily: FONTS.Heavy},
  h17: {fontSize: 17,  fontFamily: FONTS.Heavy},
  h20: {fontSize: 20,  fontFamily: FONTS.Heavy},
  h24: {fontSize: 24, fontFamily: FONTS.Heavy},
  h26: {fontSize: 27,  fontFamily: FONTS.Heavy},
  h27: {fontSize: 27,   fontFamily: FONTS.Heavy},
  h28: {fontSize: 28,   fontFamily: FONTS.Heavy},
  h30: {fontSize: 30,   fontFamily: FONTS.Heavy},

  m8: {fontSize: 8,   fontFamily: FONTS.Medium},
  m13: {fontSize: 13,  fontFamily: FONTS.Medium},
  m15: {fontSize: 15,   fontFamily: FONTS.Medium},
  m16: {fontSize: 16,  fontFamily: FONTS.Medium},
  m17: {fontSize: 17, fontFamily: FONTS.Medium},
  m24: {fontSize: 24,   fontFamily: FONTS.Medium},
  m20: {fontSize: 20,   fontFamily: FONTS.Medium},
  m27: {fontSize: 27,  fontFamily: FONTS.Medium},
  m28: {fontSize: 28,  fontFamily: FONTS.Medium},
  m30: {fontSize: 30, fontFamily: FONTS.Medium},

  b8: {fontSize: 8,  fontFamily: FONTS.Book},
  b10: {fontSize: 8,  fontFamily: FONTS.Book},
  b13: {fontSize: 13,   fontFamily: FONTS.Book},
  b15: {fontSize: 15,   fontFamily: FONTS.Book},
  b16: {fontSize: 16,   fontFamily: FONTS.Book},
  b17: {fontSize: 17,   fontFamily: FONTS.Book},
  b24: {fontSize: 24,   fontFamily: FONTS.Book},
  b27: {fontSize: 27,   fontFamily: FONTS.Book},
  b20: {fontSize: 20,   fontFamily: FONTS.Book},
  b28: {fontSize: 28,  fontFamily: FONTS.Book},
});
