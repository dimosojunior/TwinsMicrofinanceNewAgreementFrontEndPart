
import React, { useState,useRef, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
Pressable, TextInput, Alert, Image,Platform, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import DirectHeader from '../Header/DirectHeader';
import MinorHeader from '../Header/MinorHeader';

import Checkbox from 'expo-checkbox'; // Make sure to install this package
import {Picker} from '@react-native-picker/picker';
import LotterViewScreen from '../Screens/LotterViewScreen';

const {width,height} = Dimensions.get('window');
const OngezaBranch = ({ navigation }) => {

 const [loadingTime, setLoadingTime] = useState(0);


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

const [isPending2, setPending2] =useState(true);




  //console.log("Push Token Again", pushToken);


 const [isPasswordVisible, setPasswordVisible] = useState(false);

  //const {width,height} = Dimensions.get('window');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [BranchName, setBranchName] = useState('');
  const [password2, setPassword2] = useState('');

const [Mahali, setMahali] = useState('');

  const [ManagerWaBranchFullName, setManagerWaBranchFullName] = useState('');
  const [ManagerWaBranchMobileNumber, setManagerWaBranchMobileNumber] = useState('');
const [MsaidiziWaBranchFullName, setMsaidiziWaBranchFullName] = useState('');
const [MsaidiziWaBranchMobileNumber, setMsaidiziWaBranchMobileNumber] = useState('');
  

const [CashierWaBranchFullName, setCashierWaBranchFullName] = useState('');
const [CashierWaBranchMobileNumber, setCashierWaBranchMobileNumber] = useState('');
 
  //const [phone, setPhone] = useState('');
  //const [profile_image, setProfile_image] = useState('');

  const [error, setError] = useState(null); // State to hold the error message
const [isPending, setPending] =useState(false);
const emailRegex = /\S+@\S+\.\S+/;

const [errorMessage, setErrorMessage] = useState('');



const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Registration error. Please try again later.');
      // } else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      // else {
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('Taarifa zako sio sahihi');
    }
  };

  const handleRegistration = async () => {
    // Reset the error message
    setError(null);

  


    if (!BranchName) {
     // setError('please enter your BranchName');
      showAlertFunction("Tafadhali jaza jina la Branch");
      return;
    }


    //  if (!selectedBranchName) {
        
    //     showAlertFunction("Tafadhali chagua Branch unayosajili kikundi");
    //      return;
    // } 


  if (!Mahali) {
     // setError('please enter your BranchName');
      showAlertFunction("Tafadhali jaza sehemu Branch ilipo");
      return;
    }


   if (!ManagerWaBranchFullName) {
     // setError('please enter your BranchName');
      showAlertFunction("Tafadhali jaza jina la Branch manager");
      return;
    }


  

  


    setPending(true);

    try {
      const response = await axios.post(
        EndPoint + '/OngezaBranchView/', {
        
        BranchName: BranchName,
        //BranchName:selectedBranchName,
        Mahali: Mahali,
        ManagerWaBranchFullName:ManagerWaBranchFullName,
        ManagerWaBranchMobileNumber:parseInt(ManagerWaBranchMobileNumber),
        MsaidiziWaBranchFullName:MsaidiziWaBranchFullName,
        MsaidiziWaBranchMobileNumber:parseInt(MsaidiziWaBranchMobileNumber),

        CashierWaBranchFullName:CashierWaBranchFullName,
        CashierWaBranchMobileNumber:parseInt(CashierWaBranchMobileNumber),
        
        
      });
      //Alert.alert("You have registered Successfully");
       //showAlertFunction(expoPushToken);
       showAlertFunction("Umefanikiwa kusajili Kikundi kipya");
      //navigation.replace('Home Stack');

      //const token = response.data.token; // Extract the token from the response
      // You can now save the token to your app's state, AsyncStorage, or Redux store
    
  setPending(false);
  //setEmail('');
  setManagerWaBranchFullName('');
  setManagerWaBranchMobileNumber('');
  setMsaidiziWaBranchFullName('');
  setMsaidiziWaBranchMobileNumber('');
  setBranchName('');
  setMahali('');

  setCashierWaBranchFullName('');
  setCashierWaBranchMobileNumber('');
 
  


//mwisho wa kusave data





    } catch (error) {
      if (error.response) {
       
         console.log("ERRRORR", error);
      } else {
        console.log("ERRRORR", error);
        //setError('Registration error. Please try again later.');
        //showAlertFunction("Registration error. Please try again later.");
        handleErrorMessage(error);
        setPending(false);
      }
    }
  };

  
  return (


    <>{!fontsLoaded ? (<View/>):(

     


<LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>
   
      
{isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Sajili Branch</Text>
      <Text style={globalStyles.loaderCounter2}>tafadhali subiri....</Text>
    </View>
  </View>
)}




         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Sajili Kikundi kipya</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>




      <Text style={styles.label}>Jina La Branch</Text>
      <TextInput value={BranchName} 
      onChangeText={setBranchName} 
      placeholder="jina la branch" 
      placeholderTextColor="wheat"
      style={styles.input} 
      />


 <Text style={styles.label}>Mahali Kikundi kilipo</Text>
      <TextInput value={Mahali} 
      onChangeText={setMahali} 
      placeholder="mahali" 
      placeholderTextColor="wheat"
      style={styles.input} 
      />

  <Text style={styles.label}>Jina Kamili La Meneja Wa Branch</Text>
      <TextInput value={ManagerWaBranchFullName} 
      onChangeText={setManagerWaBranchFullName} 
      placeholder="manager wa Branch" 
      placeholderTextColor="wheat"
      style={styles.input} 
      />


<Text style={styles.label}>Namba Ya Simu Meneja Wa Branch</Text>
      <TextInput value={ManagerWaBranchMobileNumber} 
      onChangeText={setManagerWaBranchMobileNumber} 
      placeholder="Namba ya simu ya manager " 
      placeholderTextColor="wheat"
      keyboardType="numeric"
      style={styles.input} 
      />



<Text style={styles.label}>Jina Kamili La Msaidizi Wa Branch</Text>
      <TextInput value={MsaidiziWaBranchFullName} 
      onChangeText={setMsaidiziWaBranchFullName} 
      placeholder="Afisa mikopo" 
      placeholderTextColor="wheat"
      style={styles.input} 
      />


<Text style={styles.label}>Namba Ya Simu Msaidizi Wa Branch</Text>
      <TextInput value={MsaidiziWaBranchMobileNumber} 
      onChangeText={setMsaidiziWaBranchMobileNumber} 
      placeholder="Namba ya simu ya Afisa mikopo " 
      placeholderTextColor="wheat"
      keyboardType="numeric"
      style={styles.input} 
      />



<Text style={styles.label}>Jina Kamili la Cashier Wa Branch</Text>
      <TextInput value={CashierWaBranchFullName} 
      onChangeText={setCashierWaBranchFullName} 
      placeholder="jina kamili la cashier " 
      placeholderTextColor="wheat"
      keyboardType="numeric"
      style={styles.input} 
      />


<Text style={styles.label}>Namba Ya Simu Ya Cashier Wa Branch</Text>
      <TextInput value={CashierWaBranchMobileNumber} 
      onChangeText={setCashierWaBranchMobileNumber} 
      placeholder="Namba ya simu ya cashier " 
      placeholderTextColor="wheat"
      keyboardType="numeric"
      style={styles.input} 
      />




  

      <TouchableOpacity onPress={handleRegistration} style={styles.submitButton}>
        <Text style={styles.submitText}>Sajili Branch</Text>
      </TouchableOpacity>




         <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Overdose Stores"
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
      

<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>



    </ScrollView>


 </LinearGradient> 









     )}</>





  );
}

export default OngezaBranch;



const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { 
    fontWeight: 'bold',
     marginTop: 12 ,
     marginBottom:10,
     color:'white',
   },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 10,
    borderRadius: 5,
    color:'wheat',
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 3,
    color:'white',
    //backgroundColor:'white',
  },
  genderButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedGender: {
    backgroundColor: '#aaa',
  },
  submitButton: {
    backgroundColor: '#015d68',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },


  dateRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
dateInput: {
  flex: 1,
  marginRight: 10,
  //color:'white',
},
dateTextreg:{
  color:'white',
},

});
