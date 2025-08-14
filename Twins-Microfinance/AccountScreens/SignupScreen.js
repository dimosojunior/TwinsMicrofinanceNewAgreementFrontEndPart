
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
const SignupScreen = ({ navigation }) => {

 

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


// State variable to store the RoomClasses data
  const [BranchName, setBranchName] = useState([]);
 const [selectedBranchName, setSelectedBranchName] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    setPending2(true);
    fetch(`${EndPoint}/Add/AllBranchesViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setBranchName(data);
        setPending2(false);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        setPending2(false);
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);



  //console.log("Push Token Again", pushToken);

 const [secureText, setSecureText] = useState(true);
 const [isPasswordVisible, setPasswordVisible] = useState(false);

  //const {width,height} = Dimensions.get('window');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password2, setPassword2] = useState('');
  const [full_name, setfull_name] = useState('');

  //const [phone, setPhone] = useState('');
  //const [profile_image, setProfile_image] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
const [isStaff, setIsStaff] = useState(false);
const [isCashier, setIsCashier] = useState(false);

  

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

    // Validation checks
    if (!password && !username) {
      //setError('All fields are required');
      showAlertFunction("Tafadhali jaza taarifa zote kwa usahihi");
      return;
    }

    // if (!email) {
    //   //setError('please enter your valid email');
    //    showAlertFunction("Tafadhali ingiza email yako kwa usahihi");
    //   return;
    // }

    if (!password) {
      //setError('please enter your password');
       showAlertFunction("Tafadhali ingiza password yako kwa usahihi");
      return;
    }


     if (password !== password2) {
      showAlertFunction("Neno siri ulizoingiza hazifanani");
      return;
    }

    // Validate email format
  
  // if (!emailRegex.test(email)) {
  //   showAlertFunction("Tafadhali fuata kanuni za kuandika email, @");
  //   return;
  // }

  // Validate password length
  if (password.length < 4) {
    showAlertFunction("tafadhali neno siri linapaswa kuwa na tarakimu zaidi ya 4");
    return;
  }

    if (!username) {
     // setError('please enter your username');
      showAlertFunction("Tafadhali ingiza jina unalotumia (username) kwa usahihi");
      return;
    }

    // if (!phone) {
    //   //setError('please enter your phone number');
    //    showAlertFunction("Tafadhali ingiza namba yako ya simu kwa usahihi");
    //   return;
    // }

      // Validate phone number
  // if (!phone.startsWith("0")) {
  //   showAlertFunction("Namba ya simu lazima ianze na 0");
  //   return;
  // }

  // if (phone.length !== 10) {
  //   showAlertFunction("Namba ya simu lazima iwe na tarakimu 10");
  //   return;
  // }


 // if (!selectedJinaLaKituo) {
 //          showAlertFunction('Tafadhali chagua kikundi unachomsajili mtumiaji.');
 //          return;
 //        }

  // Fetch the Expo push token
  // const expoPushToken = await registerForPushNotificationsAsync();
 // const expoPushToken = pushToken;

  // if (!expoPushToken) {
  //   showAlertFunction("Imeshindikana, Kifaa chako kimeshindwa kutengeneza token");
  //   return;
  // }




    setPending(true);

    try {
      const response = await axios.post(
        EndPoint + '/Account/register_user/', {
        //email: email,
        password: password,
        username: username,
        //full_name: full_name,
        is_admin: isAdmin,
        is_staff: isStaff,
        is_cashier: isCashier,
        BranchName:selectedBranchName
        //Location:Location
        
      });
      //Alert.alert("You have registered Successfully");
       //showAlertFunction(expoPushToken);
       showAlertFunction("Umefanikiwa kuongeza taarifa mpya ya Branch");
      //navigation.replace('Home Stack');

      //const token = response.data.token; // Extract the token from the response
      // You can now save the token to your app's state, AsyncStorage, or Redux store
    
  setPending(false);
  //setEmail('');
  setUsername('');
  setPassword('');
  setPassword2('');
  //setPhone('');
  


//mwanzo wa kusave user data


 // const token = response.data.token;
 //      await AsyncStorage.setItem('userToken', token);
 //      //navigation.emit('updateUserToken', token);

 //      // Now, make another request to get user data
 //      const userResponse = await axios.get(EndPoint + '/Account/user_data/', {
 //        headers: {
 //          Authorization: `Token ${token}`,
 //        },
 //      });

 //      const userData = userResponse.data;
 //      // Save user data to AsyncStorage
 //      await AsyncStorage.setItem('userData', JSON.stringify(userData));

 //      // Emit the 'updateUserToken' event
 //      // hii inasaidia kupata a login user token automatically without
 //      // page refreshing
 //      EventRegister.emit('updateUserToken', token);



      // Pass the userData to Home Stack
      // navigation.replace('MainScreen', { userData });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home Stack' }],
      // });



//mwisho wa kusave data





    } catch (error) {
      if (error.response) {
        if (error.response.data.email) {
         // setError('Email already exists');
          showAlertFunction("Email uliyotumia kusajilia tayari ipo");
          setPending(false);
        } else if (error.response.data.username) {
          //setError('Username already exists');
          showAlertFunction("Jina la branch ulilotumia kusajili tayari lipo");
          setPending(false);
        }else if (error.response.data.phone) {
          //setError('Phone number already exists');
          showAlertFunction("Namba ya simu uliyotumia kusajili tayari ipo");
          setPending(false);
        }


      } else {
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
      <Text style={globalStyles.loaderText}>Taarifa mpya ya Branch</Text>
      <Text style={globalStyles.loaderCounter2}>tafadhali subiri....</Text>
    </View>
  </View>
)}






         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Sajili Taarifa Za Branch</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>
     {/* <Text style={styles.label}>Jina Kamili</Text>
      <TextInput value={full_name} onChangeText={setfull_name} 
      placeholder="Jina Kamili" 
      placeholderTextColor="wheat"
      style={styles.input} />*/}
  
  
<Text style={styles.label}>Jina la kuingilia</Text>
  <View style={styles.inputContainer}>
      <FontAwesome name="user" size={20} color="#fff" style={styles.icon} />
      <TextInput 
          style={styles.input} 
          placeholder="jina la kuingilia"
          placeholderTextColor="#bbb"
          //secureTextEntry={secureText}
          value={username}
       onChangeText={(text) => setUsername(text)}
      />
      
  </View>

  
{/* Password Field */}
<Text style={styles.label}>Neno Siri</Text>
  <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
      <TextInput 
          style={styles.input} 
          placeholder="neno siri"
          placeholderTextColor="#bbb"
          secureTextEntry={secureText}
          value={password}
       onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
      </TouchableOpacity>
  </View>


  {/* Password Field */}
<Text style={styles.label}>Rudia Neno Siri</Text>
  <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
      <TextInput 
          style={styles.input} 
          placeholder="Rudia neno siri"
          placeholderTextColor="#bbb"
          secureTextEntry={secureText}
          value={password2}
       onChangeText={(text) => setPassword2(text)}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
      </TouchableOpacity>
  </View>






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
                 Branch
            </Text>

     <View style={globalStyles.picker}>

            
      
          <Picker
    selectedValue={selectedBranchName}
    onValueChange={(itemValue) => setSelectedBranchName(itemValue)}
    >
        {BranchName.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.BranchName} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}






<Text style={{
  color:'wheat',
  marginLeft:0,
}}>Weka tiki sehemu sahihi kutokana na taarifa ulizojaza hapo juu</Text>

{/*mwanzo wa checkboxes*/}
 <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={isAdmin}
            onValueChange={setIsAdmin}
            color={isAdmin ? '#2196F3' : undefined}
            style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
          />
          <Text style={styles.checkboxLabel}>Ni Admin ?</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={isStaff}
            onValueChange={setIsStaff}
            color={isStaff ? '#2196F3' : undefined}
            style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
          />
          <Text style={styles.checkboxLabel}>Ni Afisa Mikopo ?</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={isCashier}
            onValueChange={setIsCashier}
            color={isCashier ? '#2196F3' : undefined}
            style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
          />
          <Text style={styles.checkboxLabel}>Ni Cashier ?</Text>
        </View>
      </View>

     {/*mwisho wa checkboxes*/}  





      <TouchableOpacity onPress={handleRegistration} style={styles.submitButton}>
        <Text style={styles.submitText}>Kusanya Taarifa</Text>
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

export default SignupScreen;




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

dropdownBox: {
  padding: 12,
  backgroundColor: 'rgba(0,0,0,0)',
  borderRadius: 8,
  borderColor: 'white',
  borderWidth: 1,
  marginBottom: 10,
},
dropdownText: {
  color: 'white',
},
dropdownList: {
  //maxHeight: 150,
  //backgroundColor: '#015d68',
  borderRadius: 8,
  elevation: 4,
  //Zindex:1,
  color: 'white',
  paddingHorizontal:10,
},
dropdownItem: {
  padding: 10,
  // borderBottomColor: 'red',
  // borderBottomWidth: 1,
  color: 'white',

},
phoneInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
},
prefix: {
  fontSize: 16,
  color: '#555',
},
phoneInput: {
  flex: 1,
  paddingVertical: 10,
  paddingLeft: 10,
  color: '#000',
},


 checkboxContainer: {
    width: '100%',
    marginBottom: 20,
    //backgroundColor:'red',
    marginTop:20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    //fontSize: 16,
    fontFamily: 'Light',
    color:'white',
  },


  inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        width: '100%',
        // borderColor:'white',
        // borederWidth:1,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#fff',

    },
    loginButton: {
        // backgroundColor: '#007AFF',
        //backgroundColor: '#0c9b56',
        backgroundColor:'#015d68',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});
