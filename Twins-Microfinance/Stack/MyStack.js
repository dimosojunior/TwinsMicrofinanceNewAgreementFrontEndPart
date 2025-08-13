
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SigninScreen from '../AccountScreens/SigninScreen';
import SignupScreen from '../AccountScreens/SignupScreen';
// import UpdateScreen from '../AccountScreens/UpdateScreen';
// import PreLoaderScreen from '../Screens/PreLoaderScreen';
// import AccountSelection from '../Screens/AccountSelection';

// import SendOTPScreen from '../AccountScreens/SendOTPScreen';
// import VerifyOTPScreen from '../AccountScreens/VerifyOTPScreen';
import ChangePasswordScreen from '../AccountScreens/ChangePasswordScreen';


import HomeScreen from '../Screens/HomeScreen';
import MikatabaYote from '../Screens/MikatabaYote';
import DeleteMteja from '../Screens/DeleteMteja';

import JazaRejesho from '../Marejesho/JazaRejesho';
import MikatabaHai from '../Screens/MikatabaHai';
import MtejaDetails from '../Screens/MtejaDetails';

import NjeYaMkatabaWote from '../Screens/NjeYaMkatabaWote';
import NJeYaMkatabaLeo from '../Screens/NJeYaMkatabaLeo';

import MarejeshoYaLeo from '../Marejesho/MarejeshoYaLeo';
import FainiZaLeo from '../Marejesho/FainiZaLeo';

import RipotiYaSiku from '../Screens/RipotiYaSiku';
import FutaRipoti from '../Screens/FutaRipoti';

import HawajarejeshaJana from '../Screens/HawajarejeshaJana';

import JazaFaini from '../Marejesho/JazaFaini';

import WamemalizaHawajakopaTena from '../Screens/WamemalizaHawajakopaTena';

import OngezaKituo from '../Screens/OngezaKituo';

import PreLoaderScreen from '../Screens/PreLoaderScreen';


import VituoVilivyosajiliwa from '../Screens/VituoVilivyosajiliwa';
import DeleteKituo from '../Screens/DeleteKituo';

import TaarifaZaVituo from '../Screens/TaarifaZaVituo';
import DeleteTaarifaZaKituo from '../Screens/DeleteTaarifaZaKituo';

import TumaUjumbe from '../Screens/TumaUjumbe';

import RenewMteja from '../Wateja/RenewMteja';
import AddMteja from '../Wateja/AddMteja';

import FutaRejesho from '../Marejesho/FutaRejesho';

import FutaFaini from '../Marejesho/FutaFaini';

import Empty from '../Screens/Empty';

import WafanyakaziWote from '../Screens/WafanyakaziWote';
import ViewMfanyakazi from '../Screens/ViewMfanyakazi';

import AddRipoti from '../Screens/AddRipoti';
import AngaliaRipotiYaKilaSiku from '../Screens/AngaliaRipotiYaKilaSiku';

import WelcomeScreen from '../Screens/WelcomeScreen';

import OngezaBranch from '../Screens/OngezaBranch';
import AllBranches from '../Screens/AllBranches';
import DeleteBranch from '../Screens/DeleteBranch';

import TaarifaZaBranches from '../Screens/TaarifaZaBranches';
import DeleteTaarifaZaBranch from '../Screens/DeleteTaarifaZaBranch';

const Stack = createStackNavigator();

function MyStack( {navigation}){

  // hii ni kwa ajili ya zile slide za mwanzo km mtu ameshaingia na akaziona
// basi akiingia kwa mara ya pili asizione tena
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  
  useEffect(() => {
    async function check(){

     const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log(appData);
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }else {
      setIsAppFirstLaunched(false);
    }



    }
    check()
   
  }, []);

// mwisho hap wa hizo codes za slides za mwanzo

 


  return (

  isAppFirstLaunched != null &&(
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

 //<NavigationContainer>
    <Stack.Navigator
    //initialRouteName="Home Stack"
      screenOptions={{
      	headerShown:false,
        headerStyle:{
          backgroundColor:"green",
           //height:100,

        },
        headerTintColor:"white",
        headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      >


{/*<Stack.Screen
      name="PreLoader Screen"
      component={PreLoaderScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
*/}

{isAppFirstLaunched && (
       <Stack.Screen
      name="Welcome Screen"
      component={WelcomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
)}


 <Stack.Screen
      name="Signin Stack"
      component={SigninScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="Signup Stack"
      component={SignupScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



       <Stack.Screen
      name="Home Stack"
      component={HomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

            <Stack.Screen
      name="Mikataba Yote"
      component={MikatabaYote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Delete Mteja"
      component={DeleteMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

 
   {/*        <Stack.Screen
      name="Jaza Rejesho"
      component={JazaRejesho}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
*/}


  {/*<Stack.Screen
      name="Jaza Faini"
      component={JazaFaini}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
*/}

   <Stack.Screen
      name="Wamemaliza Hawajakopa Tena"
      component={WamemalizaHawajakopaTena}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Mikataba Hai"
      component={MikatabaHai}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

              <Stack.Screen
      name="Mteja Details"
      component={MtejaDetails}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

         <Stack.Screen
      name="Nje Ya Mkataba Leo"
      component={NJeYaMkatabaLeo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Nje Ya Mkataba Wote"
      component={NjeYaMkatabaWote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


             <Stack.Screen
      name="Marejesho Ya Leo"
      component={MarejeshoYaLeo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


              <Stack.Screen
      name="Faini Za Leo"
      component={FainiZaLeo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


                <Stack.Screen
      name="Ripoti Ya Siku"
      component={RipotiYaSiku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                <Stack.Screen
      name="Futa Ripoti"
      component={FutaRipoti}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


                  <Stack.Screen
      name="Ongeza Kituo"
      component={OngezaKituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


      


       <Stack.Screen
      name="Badili Password"
      component={ChangePasswordScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


        <Stack.Screen
      name="Hawajarejesha Jana"
      component={HawajarejeshaJana}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />




        <Stack.Screen
      name="Vituo Vilivyosajiliwa"
      component={VituoVilivyosajiliwa}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Delete Kituo"
      component={DeleteKituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


            <Stack.Screen
      name="Taarifa Za Vituo"
      component={TaarifaZaVituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



            <Stack.Screen
      name="Delete Taarifa Za Kituo"
      component={DeleteTaarifaZaKituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


              <Stack.Screen
      name="Tuma Ujumbe"
      component={TumaUjumbe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


               <Stack.Screen
      name="Renew Mteja"
      component={RenewMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Sajili Mteja"
      component={AddMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





  <Stack.Screen
      name="Futa Rejesho"
      component={FutaRejesho}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="Futa Faini"
      component={FutaFaini}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


      <Stack.Screen
      name="Empty Screen"
      component={Empty}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="Wafanyakazi Wote"
      component={WafanyakaziWote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="View Mfanyakazi"
      component={ViewMfanyakazi}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



       <Stack.Screen
      name="Add Ripoti"
      component={AddRipoti}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


          <Stack.Screen
      name="Angalia Ripoti"
      component={AngaliaRipotiYaKilaSiku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





          <Stack.Screen
      name="Ongeza Branch"
      component={OngezaBranch}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



          <Stack.Screen
      name="All Branches"
      component={AllBranches}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


           <Stack.Screen
      name="Delete Branch"
      component={DeleteBranch}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


        <Stack.Screen
      name="Taarifa Za Branches"
      component={TaarifaZaBranches}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


    <Stack.Screen
      name="Delete Taarifa Za Branch"
      component={DeleteTaarifaZaBranch}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





 

      </Stack.Navigator>
      //	</NavigationContainer>

  
      ) 
//bano la kufunga if is first launched


    );
  }
  export default MyStack;