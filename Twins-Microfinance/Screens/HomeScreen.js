import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Linking,
  Animated,
  Alert,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import Header from '../Header/header';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen');
const contents = [
 
  { id: '1', title: 'Mikataba Yote', icon: 'th-large', screen: 'Mikataba Yote' },
  { id: '2', title: 'Mikataba Hai', icon: 'book', screen: 'Mikataba Hai' },
   { id: '3', title: 'Marejesho', icon: 'credit-card', screen: 'Marejesho Ya Leo' },
  { id: '4', title: 'Faini', icon: 'user-times', screen: 'Faini Za Leo' },
  { id: '5', title: 'Nje Ya Mkataba Leo', icon: 'user-times', screen: 'Nje Ya Mkataba Leo' },
  { id: '6', title: 'Nje Ya Mkataba Wote', icon: 'user-secret', screen: 'Nje Ya Mkataba Wote' },
  { id: '7', title: 'Hawajakopa Tena', icon: 'user-o', screen: 'Wamemaliza Hawajakopa Tena' },

  { id: '8', title: 'Report Summary', icon: 'bar-chart', screen: 'Ripoti Ya Siku' },

];

const contents2 = [
  { id: '1', title: 'Vikundi', icon: 'users', screen: 'Vituo Vilivyosajiliwa' },
  { id: '2', title: 'Wafanyakazi', icon: 'user', screen: 'Wafanyakazi Wote' },
  { id: '6', title: 'Mishahara', icon: 'user-circle', screen: 'Empty Screen' },
];

const groupIntoRows = (data, itemsPerRow = 3) => {
  const rows = [];
  for (let i = 0; i < data.length; i += itemsPerRow) {
    rows.push(data.slice(i, i + itemsPerRow));
  }
  return rows;
};

export default function HomeScreen({ navigation }) {
  
  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const format = (n) => (n < 10 ? `0${n}` : n);
      const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      const time = `${format(now.getHours())}:${format(now.getMinutes())}:${format(now.getSeconds())}`;
      setDateTime({ date, time });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!fontsLoaded) return <View />;

  return (
    <LinearGradient colors={['#015d68', '#000']} style={styles.container}>
      <Header />

      <View style={globalStyles.TwinsMicrofinanceheader}>
               <View style={globalStyles.TwinsMicrofinanceImageAndText}>
                <Image source={require('../assets/icon.png')} style={globalStyles.TwinsMicrofinancelogo} />
                  <Text style={globalStyles.TwinsMicrofinanceTarehe}>{dateTime.date}, {dateTime.time} </Text>
            
                </View>
               <View style={globalStyles.TwinsMicrofinanceTextDescAndTarehe}>
               <Text style={globalStyles.TwinsMicrofinanceappTitle}>Twins Microfinance </Text>
                <Text style={globalStyles.TwinsMicrofinanceappDesc}>Huduma Bora za Kifedha kwa Wote</Text>
                 </View>

            </View>



      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Mikopo</Text>
        <Text style={styles.sectionDesc}>Pata fursa za mikopo na uwekezaji kwa urahisi</Text>
        {groupIntoRows(contents).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.cardRow}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.option}
                onPress={() => navigation.navigate(item.screen)}
              >
                <FontAwesome 
                style={styles.iconfromOption}
                name={item.icon} size={30} color="white" />
                <Text style={styles.optionTitle}>{item.title}</Text>
                <Ionicons name="arrow-forward-circle" size={20} color="white" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Mishahara Na Wafanyakazi</Text>
        <Text style={styles.sectionDesc}>Chagua huduma inayokufaa kutoka kwenye orodha yetu</Text>
        {groupIntoRows(contents2).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.cardRow}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.option}
                onPress={() => navigation.navigate(item.screen)}
              >
                <FontAwesome name={item.icon} size={30} color="white" />
                <Text style={styles.optionTitle}>{item.title}</Text>
                <Ionicons name="arrow-forward-circle" size={20} color="white" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  dateText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Regular',
  },
  appTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Medium',
  },
  appSubtitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Regular',
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  sectionTitle: {
    color: 'white',
    //fontSize: 18,
    fontFamily: 'Medium',
    //marginTop: 20,
  },
  sectionDesc: {
    color: 'white',
    fontFamily: 'Regular',
    marginBottom: 10,
  },

  cardRow: {
    backgroundColor: '#015d68',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    // elevation: 5,
    // shadowColor: 'black',
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3,

      borderColor:'white',
    //borderWidth:.2,
     elevation: 3,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,
  },

  option: {
    alignItems: 'center',
    width: '30%',

      borderColor:'white',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:5,
     paddingVertical:5,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,
 // borderRadius:1,

  },
  iconfromOption:{
    fontFamily:'Bold',

  },
  optionTitle: {
    color: 'white',
    fontFamily: 'Regular',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});
