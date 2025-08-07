

import { StyleSheet,Platform,ImageBackground, Text,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import useFetch from '../useFetch';
import axios from 'axios';

// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
//import LotterViewScreen from '../Screens/LotterViewScreen';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font'; 

const {width, height} = Dimensions.get('window');

const WelcomeScreen =({navigation}) => {

     let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const [showImage, setShowImage] = useState(true);
  //  const [showImage, setShowImage] = useState(true);
  // const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setShowImage(prev => !prev);
  }, 5000); // Badilisha kila sekunde 5

  return () => clearInterval(interval); // Safisha timer uki-exit
}, []);


   // To change color
// const theme = useContext(themeContext)
// const [darkMode, setdarkMode] = useState(false)

  //const navigation = useNavigation();

  const [onboardings, setOnboardings] = useState([
    {
      Title:'Simamia Mikopo kwa Ufanisi – Popote Ulipo',
      Description:'Pata mfumo bora wa kudhibiti mikopo, wateja, marejesho, faini na ripoti kwa urahisi. Iwe ni mteja mpya au wa zamani, kila hatua ya mkopo inasimamiwa kwa usahihi. Hakuna tena kuhangaika na kumbukumbu zisizo sahihi — kila kitu kiko kwenye mfumo',
      OnboardingLotterView:require('../assets/Loading/1.json'), 
      OnboardingImage:require('../assets/3.jpg'), 
      id:'1'
    },
    {
      Title:'Mfumo Mahiri kwa Biashara ya Microfinance',
      Description:'Fuatilia mikataba hai, marejesho ya kila siku, na taarifa za wateja kwa wakati halisi. Tengeneza ripoti za kifedha kwa kila kituo na fahamu maendeleo ya biashara yako. Ufanisi, uwazi na kasi ya utendaji vipo mikononi mwako sasa.',
     OnboardingLotterView:require('../assets/Loading/2.json'), 
     OnboardingImage:require('../assets/2.jpg'),  
      id:'2'},
    {
      Title:'Kopesha kwa Kujiamini – Kidigitali',
       Description:'Tumia teknolojia kuboresha huduma zako za mikopo kwa usalama na ufanisi. Weka kumbukumbu zote kwa njia ya kisasa: kutoka kwa usajili hadi malipo. App hii ni msaada wako bora katika kuongeza wateja na kupunguza upotevu.',
     OnboardingLotterView:require('../assets/Loading/3.json'), 
     OnboardingImage:require('../assets/4.jpg'), 
      id:'3'
    },
 
    ]);
  
//  FOR UNIVERSITY APIS
// const { onboardings, isPending, error } = useFetch('https://dd83-197-250-225-180.eu.ngrok.io/apis/onboardings');
// https://myapis.pythonanywhere.com/authentication/user_list_view/

 //FOR  APIS
//const { datas:onboardings, isPending, error } = useFetch('https://lisheapisapp.pythonanywhere.com/Lishe/OnBoarding/');


 




 const Slide = ({item}) => {
  return (

<View style={{ alignItems: 'center', height: height / 2 }}>
  {showImage ? (
    <ImageBackground
      source={item?.OnboardingImage}
      style={{
        alignItems: 'center',
        width: width,
        justifyContent: 'center',
        height: height / 2,
      }}
      resizeMode="cover"
    />
  ) : (
 
 <Image
 style={{
        alignItems: 'center',
        width: width,
        justifyContent: 'center',
        height: height / 2,
      }}
      resizeMode="cover"
   source={require('../assets/1.jpg')} 
      >
      </Image>

  )}

  <View style={{
    width: width,
    paddingHorizontal: 20,
    alignItems: 'center',
  }}>
    <Text style={styles.title1}>
      {item?.Title}
    </Text>

    <Text style={[styles.title, {
      color: "white",
      borderColor: 'white',
      borderWidth: .2,
      elevation: 2,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 6,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: Platform.OS === "android" ? 'white' : "white",
      shadowOpacity: 0,
      shadowRadius: 0,
    }]}>
      {item?.Description}
    </Text>
  </View>
</View>


      );
};




const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);

     // If last slide, show modal
    if (currentIndex === onboardings.length - 1) {
      setTimeout(() => setModalVisible(true), 500);
    }

  };

  //const ref = useRef();

 
   



  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != onboardings.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };




  const skip = () => {
    const lastSlideIndex = onboardings.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          

          
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            
            height:height/14
          }}>
          {/* Render indicator */}
          {onboardings.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor:'red',
                  width: 15,
                  height:15,
                  borderRadius:10,
                },
              ]}
            />
          ))}
        </View>

        
        <View style={{marginBottom: 40}}>
          {currentSlideIndex == onboardings.length - 1 ? (
           
              <TouchableOpacity
                style={styles.getstarted2}
                //onPress={() => navigation.replace('Signin Stack')}
                onPress={() => setModalVisible(true)}
               >
                
                 <Ionicons name="arrow-up-circle" 
                 size={50} color="white" />
              </TouchableOpacity>
            
          ) : null }

         
            <View style={{flexDirection: 'row'}}>
            {/*kwa ajili ya viradio*/}

              <View style={{width: 15}} />
            
            </View>
          
        </View>
      </View>
    );
  };


 
  return (

   <>{!fontsLoaded ? (<View/>):(

    
    

  // {<Header />}


// {mwanzo wa list za modules}

 <LinearGradient colors={['#015d68', '#000']} 
 //style={globalStyles.container}
 style={{flex: 1,
width: Dimensions.get('window').width,
height:height,
}}
 >
   


{/*mwanzo wa flat list*/}


 


<FlatList 
keyExtractor={item => item.id}
ref={ref}
onMomentumScrollEnd={updateCurrentSlideIndex}
// contentContainerStyle={{height: height/2 + 100}}
showsHorizontalScrollIndicator={false}
horizontal
data={onboardings}
pagingEnabled
// contentContainerStyle={{
//   marginTop:10,
//   paddingBottom:30,
//   flex:1,
//   flexDirection:'row',
// }}
// numColumns ={2} 

renderItem = {({item}) => <Slide item={item}/>}

/>
  
<Footer />


{/*mwisho wa flat list*/}












      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
      
        <View style={styles.modalContainer}>

   

          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: 'flex-end' }}
            >
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>✅  Twins Microfinance – Terms and Conditions</Text>
           
           <ScrollView keyboardShouldPersistTaps="handled">
         <View style={{
          justifyContent:'left',
         }}>
            <Text style={[styles.modalText2,{
              color:'wheat',
              fontWeight:'bold',

            }]}>
              Karibu Twins Microfinance!
            </Text>

            
 <Text style={styles.modalText2}>
      Kwa kutumia Twins Microfinance, unakubali kutumia app hii kwa shughuli halali tu za kifedha, ikiwemo usimamizi wa mikopo na marejesho. 
      Unapaswa kutoa taarifa sahihi wakati wa usajili na kutumia mfumo kwa uadilifu.
    </Text>

    <Text style={styles.modalText2}>
      Taarifa zako binafsi, pamoja na taarifa za kifedha za wateja, zinalindwa na hazitashirikishwa bila idhini yako, isipokuwa pale inapolazimishwa na sheria.
      Twins Microfinance haitoajibika kwa hasara yoyote inayotokana na matumizi mabaya ya mfumo huu.
    </Text>

    <Text style={styles.modalText2}>
      Tunaweza kusitisha au kufuta akaunti yako ikiwa utatumia mfumo kinyume cha sheria au masharti haya.
      Kuendelea kutumia app kunamaanisha unakubali mabadiliko yoyote ya baadaye kwenye sera hii.
      Kwa maswali, wasiliana nasi kupitia support@twinsmicrofinance.com.
    </Text>

           <Text style={styles.modalText2}>
      Kwa kubonyeza ✅ , unakubali vigezo na masharti haya.
    </Text>
            </View>
            </ScrollView>

            <View style={styles.checkboxContainer}>
              <Checkbox
              style={{
               marginRight: 10,
               height:40,
               width:40,
               borderWidth:1,
               borderColor:'white',
               fontWeight:'bold',

                }}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#015d68' : undefined}
              />
              <Text style={{ 
                marginLeft: 10,
                color:'wheat',
               }}>Nimeelewa na Nimekubali</Text>
            </View>

            {isChecked && (
              <TouchableOpacity
                onPress={() => navigation.replace('Signin Stack')}
                style={styles.getstarted}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>INGIA</Text>
                <Ionicons name="arrow-forward-circle" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>

        </View>

      </Modal>





</LinearGradient>


)}</>

     
  );
}
export default WelcomeScreen;

const styles = StyleSheet.create({
 // header:{
 //  width:'100',
 // height:'15%',
 // backgroundColor:'#c8c8c8',
 // alignItems:'center',
 // justifyContent:'center',
 // },


subtitle: {
    color:'white',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },

  title1: {
    color:'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,

    // textAlign: 'center',
  },

  title: {
    color:'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,


    // textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 15,
    width: 15,
    backgroundColor: 'green',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getstarted:{
    flex: 1,
    position:'absolute',
    bottom:0,
    right:5,
    
    borderRadius: 5,
    backgroundColor: '#015d68',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    borderColor:"green",

    // borderColor:'white',
    // borderWidth:.2,
     elevation: 2,
    
  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,

  },

 getstarted2:{
    flex: 1,
    position:'absolute',
    bottom:0,
    right:5,
    
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    //borderColor:"green",

    // borderColor:'white',
    // borderWidth:.2,
     //elevation: 2,
    
  // shadowOffset: { width: 1, height: 1 },
  // shadowColor: Platform.OS === "android" ? 'white' : "white",
  // shadowOpacity: 0,
  // shadowRadius: 0,

  },




   modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: 'rgba(0,0,0,0.5)',
   // backgroundColor:'#015d68',
  },
  modalContent: {
    backgroundColor: '#015d68',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height - 50,
    elevation: 2,
    
  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color:'white',
  },
  modalText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
  },
  modalText2: {
    fontSize: 14,
    marginTop: 10,
    //textAlign: 'center',
    color: 'white',
    fontFamily:'Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
   // backgroundColor:"#063164",
  },
  getstarted: {
    marginTop: 30,
    backgroundColor: '#063164',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor:'white',
  },


    });
