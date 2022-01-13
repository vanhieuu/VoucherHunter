import React from 'react'
import { FlatList, LayoutAnimation, StyleSheet} from 'react-native'
import { Text, View } from 'react-native-ui-lib'
import URL from '../../../config/Api'
import { INewsData } from '../../../redux/newSlice'

const RelatedNews = ({tag}:{tag:any}) => {
const [loading,setLoading] = React.useState<boolean>(false);
const [news,setNews] = React.useState<INewsData[]>()
    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        fetch(URL.getNewByTag(tag.replace('#', '%23'), 1), {
          signal: signal,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
          },
        })
          .then(response => response.json())
          .then(json => {
          
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setNews(json)
              setLoading(false);
          
            return () => {
              // This code runs when component is unmounted
            controller.abort() // (4) set it to false when we leave the page
            };
          })
          .catch(err => {
            if (err.name === 'AbortError') {
              console.log('Success Abort');
            } else {
              console.error(err);
            }
          });
        return () => {
          // cancel the request before component unmounts
          controller.abort();
        };
      }, [tag]);


    return (
        <View>
            <Text style={{fontSize:20,fontWeight: 'bold'}}>Tin tức liên quan</Text>
            <Text  style={{fontSize:20,fontWeight: 'bold'}}>
                Header
            </Text>
        </View>
    )
}

export default RelatedNews

const styles = StyleSheet.create({})
