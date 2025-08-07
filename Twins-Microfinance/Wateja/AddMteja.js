import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Modal,Pressable,KeyboardAvoidingView, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import { globalStyles } from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';

import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import MinorHeader from '../Header/MinorHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";

const { width, height } = Dimensions.get('window');

const AddMteja = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };




//const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);

const [OngezaPichaOpen, setOngezaPichaOpen] = useState(false);
const [OngezaPichaClose, setOngezaPichaClose] = useState(false);





const [PichaYaMteja, setPichaYaMteja] = useState(null);



//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaMteja(result.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaMteja)
     // processImage(); // Use assets array
    // console.log("RESULT 1" ,result);
  };

//-----------filter data by date-----------------
const [startDate, setStartDate] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);
 const [isRange, setisRange] = useState(false);

 // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };






const [JinaKamiliLaMteja, setJinaKamiliLaMteja] = useState('');
const [MaelezoYaMteja, setMaelezoYaMteja] = useState('');
const [SimuYaMteja, setSimuYaMteja] = useState('');
//const [EmailYaMteja, setEmailYaMteja] = useState('');
const [Mahali, setMahali] = useState('');
const [KiasiAnachokopa, setKiasiAnachokopa] = useState(0);
const [Interval, setInterval] = useState(0);
const [SimuYaMzaminiWa1, setSimuYaMzaminiWa1] = useState('');
const [SimuYaMzaminiWa2, setSimuYaMzaminiWa2] = useState('');
const [JinaLaMzaminiWa1, setJinaLaMzaminiWa1] = useState('');
const [JinaLaMzaminiWa2, setJinaLaMzaminiWa2] = useState('');

const [BiasharaYaMteja, setBiasharaYaMteja] = useState('');

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  //const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    if (userToken) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );



        const userData = userResponse.data;
        setIsLoading(false);
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         //setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
        
       

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye usajili wa mteja mpya');
      setIsLoading(false);
    }
  };





  // State variable to store the RoomClasses data
  const [JinaLaKituo, setJinaLaKituo] = useState([]);
 const [selectedJinaLaKituo, setSelectedJinaLaKituo] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AllVituoVyote/`)
      .then((response) => response.json())
      .then((data) => {
        setJinaLaKituo(data);
        //console.log("Well");
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);



  // State variable to store the RoomClasses data
  const [Aina, setAina] = useState([]);
 const [selectedAina, setSelectedAina] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AllAinaZaMarejesho/`)
      .then((response) => response.json())
      .then((data) => {
        setAina(data);
        //console.log("Well");
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);





const handleRegistration = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

  

    if (userToken) {
        const formData = new FormData();


      // Convert the selected dates to the desired format (e.g., "YYYY-MM-DD")
  const date_of_birth = formatDate(startDate);

  if (date_of_birth) {
    formData.append('date_of_birth', date_of_birth);
  } else{
    showAlertFunction('Tafadhali jaza tarehe ya kuzaliwa');
    setIsLoading(false);
    return;
  }

  console.log("date_of_birth", date_of_birth);

        
        if (JinaKamiliLaMteja) {
            formData.append('JinaKamiliLaMteja', JinaKamiliLaMteja);
        } else {
            showAlertFunction('Tafadhali ingiza jina la mteja ?');
            setIsLoading(false);
            return;
        }



        if (selectedJinaLaKituo) {
          formData.append('JinaLaKituo', selectedJinaLaKituo);
        } else {
          showAlertFunction('Tafadhali chagua jina la kituo anachoombea mkopo.');
          setIsLoading(false);
          return;
        }


        //  if (selectedAina) {
        //   formData.append('Aina', selectedAina);
        // } else {
        //   showAlertFunction('Tafadhali chagua aina ya mpokeaji wa mkopo.');
        //   setIsLoading(false);
        //   return;
        // }



         if (SimuYaMteja) {
            formData.append('SimuYaMteja', SimuYaMteja);
        } else {
            showAlertFunction('Tafadhali ingiza namba ya simu ya mteja ');
            setIsLoading(false);
            return;
        }

      
              if (JinaLaMzaminiWa1) {
            formData.append('JinaLaMzaminiWa1', JinaLaMzaminiWa1);
        } else {
            showAlertFunction('Tafadhali ingiza jina la mzamini wa kwanza ');
            setIsLoading(false);
            return;
        }

           if (JinaLaMzaminiWa2) {
            formData.append('JinaLaMzaminiWa2', JinaLaMzaminiWa2);
        } 


       if (SimuYaMzaminiWa1) {
            formData.append('SimuYaMzaminiWa1', SimuYaMzaminiWa1);
        } else {
            showAlertFunction('Tafadhali ingiza namba ya simu ya mzamini wa kwanza ');
            setIsLoading(false);
            return;
        }

           if (SimuYaMzaminiWa2) {
            formData.append('SimuYaMzaminiWa2', SimuYaMzaminiWa2);
        } 


        //   if (EmailYaMteja) {
        //     formData.append('EmailYaMteja', EmailYaMteja);
        // } 

        //   if (!emailRegex.test(EmailYaMteja)) {
        //   showAlertFunction("Tafadhali fuata kanuni za kuandika email, @");
        //   return;
        // }


          // Validate phone number
  if (!SimuYaMteja.startsWith("0")) {
    showAlertFunction("Namba ya simu lazima ianze na 0");
    setIsLoading(false);
    return;
  }

  if (SimuYaMteja.length !== 10) {
    showAlertFunction("Namba ya simu lazima iwe na tarakimu 10");
    setIsLoading(false);
    return;
  }


           // Validate phone number
  if (!SimuYaMzaminiWa1.startsWith("0")) {
    showAlertFunction("Namba ya simu lazima ianze na 0");
    setIsLoading(false);
    return;
  }

  if (SimuYaMzaminiWa1.length !== 10) {
    showAlertFunction("Namba ya simu lazima iwe na tarakimu 10");
    setIsLoading(false);
    return;
  }


           // Validate phone number
  if (SimuYaMzaminiWa2 && !SimuYaMzaminiWa2.startsWith("0")) {
    showAlertFunction("Namba ya simu lazima ianze na 0");
    setIsLoading(false);
    return;
  }

  if (SimuYaMzaminiWa2 && SimuYaMzaminiWa2.length !== 10) {
    showAlertFunction("Namba ya simu lazima iwe na tarakimu 10");
    setIsLoading(false);
    return;
  }


          if (Mahali) {
            formData.append('Mahali', Mahali);
        } else {
            showAlertFunction('Tafadhali jaza mahali anapoishi mteja');
            setIsLoading(false);
            return;
        }


           if (BiasharaYaMteja) {
            formData.append('BiasharaYaMteja', BiasharaYaMteja);
        } else {
            showAlertFunction('Tafadhali jaza kazi/biashara anayofanya mteja');
            setIsLoading(false);
            return;
        }



          if (KiasiAnachokopa) {
            formData.append('KiasiAnachokopa', KiasiAnachokopa);
        } else {
            showAlertFunction('Tafadhali jaza kiasi anachokopa mteja');
            setIsLoading(false);
            return;
        }

          if (Interval) {
            formData.append('Interval', Interval);
        } else {
            showAlertFunction('Tafadhali jaza muda wa kumaliza deni');
            setIsLoading(false);
            return;
        }


         if (Interval > 6)  {
            showAlertFunction('Mkopo hutolewa kwa wateja mwisho miezi 6 si zaidi ya hapo');
            setIsLoading(false);
            return;
        }


         if (Interval < 1)  {
            showAlertFunction('Tafadhali jaza muda kati ya mwezi 1 hadi miezi 6');
            setIsLoading(false);
            return;
        }





        if (MaelezoYaMteja) {
            formData.append('MaelezoYaMteja', MaelezoYaMteja);
        } 

        // Ongeza picha kwenye `FormData` tu kama imechaguliwa
        if (PichaYaMteja) {
            formData.append('PichaYaMteja', {
                uri: PichaYaMteja,
                name: 'PichaYaMteja.jpg',
                type: 'image/jpeg',
            });
        }

      

        axios.post(EndPoint + '/AddWatejaWoteView/', formData, {
            headers: {
                Authorization: `Token ${userToken}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            setIsLoading(false);
            showAlertFunction("Umefanikiwa Kumsajili mteja mpya");
            setdisplayContentsState(true);
            //console.log("Well");
            setJinaKamiliLaMteja('');
            setJinaLaMzaminiWa1('');
            setJinaLaMzaminiWa2('');
            setPichaYaMteja('');
            setMaelezoYaMteja('');
            setSimuYaMteja(0);
            setSimuYaMzaminiWa1(0);
            setSimuYaMzaminiWa2(0);
            //setEmailYaMteja('');
            setMahali('');
            setBiasharaYaMteja('');
            setKiasiAnachokopa(0);
            setInterval(0);



        }).catch(error => {
            setIsLoading(false);
            setdisplayContentsState(false);
            console.log("ERRORR", error);
            handleErrorMessage(error);
        });
    }
};




  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
           

          
      
     <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>

       <MinorHeader />
        <ScrollView 
        keyboardShouldPersistTaps="handled"
        >

      
        <View style={{position: 'relative',
         bottom: 30,
         marginTop:50,
       }}>


     <View style={{
         bottom: 10,
         //marginTop:50,
         justifyContent:'center',
         alignItems:'center',
       }}>
           <Image

          style={{
            width:60,
            height:60,
            borderRadius:50,
          }}
           source={require('../assets/icon.png')} 
          >
         </Image>

         </View>


          <View style={styles.loginIcon}>
            {/*<SvgIcon icon={'enterOtp'} width={280} height={280} />*/}
       
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Twins Microfinance</Text>
            </View>


            


            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Ingiza taarifa kwa usahihi kuweza kumsajili mteja
              </Text>
           {/*   <Text style={styles.forgotDesLbl}>+91 1234567890</Text>*/}
            </View>
            <View style={styles.formCon}>

            {/*  <OTPInputView
               // pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                
               
              />*/}

          

                 {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="user-circle" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Ingiza jina kamili la mteja"
          //keyboardType="numeric"
          
          value={JinaKamiliLaMteja}
          onChangeText={setJinaKamiliLaMteja}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}




               {/*  mwanzo wa namba ya simu*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="phone-square" />
        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',

            //paddingVertical:20,
          }]}
          placeholder=" Namba ya simu ya mteja"
          keyboardType="numeric"
          
          value={SimuYaMteja}
          onChangeText={setSimuYaMteja}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}


  

    






          {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="location-arrow" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Mahali anapoishi mteja"
          //keyboardType="numeric"
          
          value={Mahali}
          onChangeText={setMahali}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}




        {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="user-circle" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Biashara / kazi anayofanya"
          //keyboardType="numeric"
          
          value={BiasharaYaMteja}
          onChangeText={setBiasharaYaMteja}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}













                 {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="user-circle" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="jina la mzamini wa kwanza"
          //keyboardType="numeric"
          
          value={JinaLaMzaminiWa1}
          onChangeText={setJinaLaMzaminiWa1}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}




               {/*  mwanzo wa namba ya simu*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

           <FontAwesome size={25} color="green" name="phone-square" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',

            //paddingVertical:20,
          }]}
          placeholder="simu ya mzamini wa kwanza"
          keyboardType="numeric"
          
          value={SimuYaMzaminiWa1}
          onChangeText={setSimuYaMzaminiWa1}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}







                 {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="user-circle" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="jina la mzamini wa pili"
          //keyboardType="numeric"
          
          value={JinaLaMzaminiWa2}
          onChangeText={setJinaLaMzaminiWa2}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}




               {/*  mwanzo wa namba ya simu*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="phone-square" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',

            //paddingVertical:20,
          }]}
          placeholder="simu ya mzamini wa pili"
          keyboardType="numeric"
          
          value={SimuYaMzaminiWa2}
          onChangeText={setSimuYaMzaminiWa2}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}



          {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="money" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Kiasi anachotaka kukopa mteja"
          keyboardType="numeric"
          
          value={KiasiAnachokopa}
          onChangeText={setKiasiAnachokopa}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}
       




     {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
              }

              ]}
          >

            <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="clock-o" />

        {/*  <Text style={{
            color: COLORS.white, 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>


          <TextInput
          style= {[styles.textinputi,{ 
             color: COLORS.white,width:'88%',
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Muda Wa Mkopo Kwa Miezi"
          keyboardType="numeric"
          
          value={Interval}
          onChangeText={setInterval}
        placeholderTextColor="wheat"
        />

      
        </View>
      {/*  mwisho wa username*/}
       






{/* Field ya Date of Birth na Calendar Icon */}
<View 
  style={[styles.dataContainerForPassword, 
    {
      width: width - 20,
      marginTop: 0,
    }
  ]}
>
  <View style={{ width: '10%' }}>
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <FontAwesome size={25} color="green" name="calendar" />
    </TouchableOpacity>
  </View>

  <TextInput
    style={[styles.textinputi, {
      color: COLORS.white,
      width: '88%',
    }]}
    placeholder="Tarehe ya Kuzaliwa"
    placeholderTextColor="wheat"
    value={startDate ? formatDate(startDate) : ""}
    editable={false} // Ili user asibadilishe moja kwa moja kwa keyboard
  />
</View>





  {/*  mwanzo wa picker*/}
{/* <View style={{ marginTop: 0 ,
  marginBottom:30,
 }}>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'black',
            marginHorizontal:0,
            width:'100%',
          }

          ]}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Aina
            </Text>

     <View style={globalStyles.picker}>

            
     
          <Picker
    selectedValue={selectedAina}
    onValueChange={(itemValue) => setSelectedAina(itemValue)}
    >
        {Aina.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.Aina} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>
*/}
  {/*  mwisho wa picker*/}




  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 0 ,
  marginBottom:30,
 }}>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'black',
            marginHorizontal:0,
            width:'100%',
          }

          ]}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Kikundi
            </Text>

     <View style={globalStyles.picker}>

            
     
          <Picker
    selectedValue={selectedJinaLaKituo}
    onValueChange={(itemValue) => setSelectedJinaLaKituo(itemValue)}
    >
        {JinaLaKituo.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.JinaLaKituo} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}








{/*mwanzo wa forget password*/}

            {!isPending && (
              <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  backgroundColor:'black',
                  marginTop:50,
                  paddingVertical:10,
                  paddingHorizontal:40,
                  borderRadius:8,
                  color:'white',
                  borderColor:'green',
                  borderWidth:1,
               // backgroundColor:'black'
              }}
              onPress={handleRegistration}>
                <Text style={styles.registerLbl}>Sajili mteja</Text>
                 <FontAwesome name='user-circle' 
                size={28}
                color='white' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
              </Pressable>
              )}




           {isPending &&
                         <View style={styles.btnContainer}>
                        <TouchableOpacity 
                        
                        >
                            <View style={styles.button1}>
                               
                             <ActivityIndicator size="large" color="green" /> 
                            </View>
                        </TouchableOpacity>
                     
                    </View>}






            </View>
          </View>
        </View>



      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <ScrollView>
        <View style={globalStyles.FilterModalmodalContainer}>
          <View style={globalStyles.FilterModalmodalContent}>
         {/* <TouchableOpacity 
          onPress ={move}>
            <Text style={globalStyles.modalTitle}>ALL</Text>
            </TouchableOpacity>*/}
            <DatePicker
              mode="calendar"
              selected={startDate}
              onDateChange={(date) => setStartDate(date)}
              format="YYYY-MM-DD" // Set the date format to "YYYY-MM-DD"
               options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "red",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "red",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: 'red',
                    borderRadius:10,
                  }}
            />

        
            <View style={[{
                      justifyContent:'space-between',
                      alignItems:'center',
                      flexDirection:'row',
                      marginVertical:15,
                      margin:6,
                    },globalStyles.ButtonConatinere]}>
                    
                    <Pressable style={[globalStyles.ButtonAdd,{
                        width:'45%',
                        backgroundColor:'red'
                    }]} 
                     onPress={() => setModalVisible(false)} 
                    >
                        <Text style={{
                            color:'white'
                        }}>Ondoa</Text>
                    </Pressable>


                     <TouchableOpacity
             // onPress={handleFilterByDate}
             onPress={() => setModalVisible(false)} 
               
              style={[globalStyles.ButtonAdd, {
                width:'45%'
              }]}
            >
              <Text style={{  color: "white" }}>Kubali</Text>
            </TouchableOpacity>
            </View>




          </View>
        </View>
        </ScrollView>
      </Modal>

    

              


                            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../assets/icon.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>Twins Microfinance</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />

</ScrollView>
      </LinearGradient>


            
          ) : (
            <LotterViewScreen />
          )}
        </>
      )}
    </>
  );
};

export default AddMteja;

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: 'white',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: COLORS.white,
    fontSize: 20,
    marginBottom:10,
    textAlign:'center',
    fontFamily:'Medium',
    //fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
     color: COLORS.white,
  },
  forgotDesLbl: {
    color: '#000',
     color: COLORS.white,
   // fontFamily: Fonts.type.NotoSansRegular,
  },
  //registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},


registerLbl:{
  // backgroundColor:'black',
  // marginTop:70,
  // paddingVertical:10,
  // paddingHorizontal:40,
  // borderRadius:8,
    color: COLORS.white,
  // borderColor:'green',
  // borderWidth:1,
  marginRight:20,


},




   textinput: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        borderColor: COLORS.green,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        padding:10,
        borderRadius:8,
        fontFamily:'Light',

        borderWidth:2,
        borderColor:'black',
    },



    dataContainerForPassword: {
      color: COLORS.white,
        fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        //borderColor: COLORS.green,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        marginTop: 50,
        padding:10,
        borderRadius:8,
        width:width-100,
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,

        borderWidth:2,
        borderColor:COLORS.white,
        
         
    },

  
    textinputi: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        fontFamily:'Light',

        
        
        marginHorizontal: 0,
        
        padding:0,
        
    },



});
