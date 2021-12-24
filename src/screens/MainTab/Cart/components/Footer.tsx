import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'



export interface RefFooter{
    setIsLoadmore:React.Dispatch<React.SetStateAction<boolean>>

}
const Footer =React.forwardRef<RefFooter> ((props,ref) => {
    const [isLoadmore,setIsLoadmore] = React.useState<boolean>(false)

    React.useImperativeHandle(ref, () => {
        return {
            setIsLoadmore
        }
      });
    return (
        <View style={styles.footerList}>
            {!!isLoadmore && <ActivityIndicator color='#15BE77' />}
        </View>
)
});

export default Footer

const styles = StyleSheet.create({
    footerList: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
      },
})
