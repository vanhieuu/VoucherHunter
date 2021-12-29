import React from 'react';
import * as IconlyPack from 'react-native-iconly';
import {Colors} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import CardLayOut from './CardLayOut';

interface AddCardProps {}

const AddCard = () => {
  return (
    <CardLayOut onPress={() => true} backgroundColor="secondary">
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{backgroundColor: 'rgba(255,255,255,0.05)'}}
        borderRadius="m">
        <IconlyPack.Wallet
          set="bulk"
          primaryColor="white"
          secondaryColor={Colors.primary}
          size="medium"
        />
      </Box>
    </CardLayOut>
  );
};

export default AddCard;


