import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import Box from '../../components/Box';
import RoundedIconButton from './RoundedIconButton';

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({left, right, title, dark}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const colors = dark ? 'background' : 'secondary';
  const backgroundColor = dark ? 'secondary' : 'undefined';

  return (
    <Box
      flexDirection="row"
      style={{marginTop: insets.top}}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m">
      <RoundedIconButton
        color="white"
        size={30}
        iconRatio={0.06}
        name={left.icon}
        onPress={left.onPress}
        align={backgroundColor === undefined ? 'flex-start' : 'center'}
        {...{colors, backgroundColor}}
      />
      <Text h20 textAlign="center" style={{color:'#fff'}}>
        {title.toUpperCase()}
      </Text>
      {right ? (
        <RoundedIconButton
          color="white"
          size={20}
          iconRatio={0.5}
          name={left.icon}
          onPress={left.onPress}
          align={ backgroundColor === undefined ? 'flex-start' : 'center'}
          {...{colors, backgroundColor}}
        />
      ) : (
        <View style={{width: 44}} />
      )}
    </Box>
  );
};

Header.defaultProps = {
  dark: false,
};

export default Header;

const styles = StyleSheet.create({});
