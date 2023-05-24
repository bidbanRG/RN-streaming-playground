
import {   StatusBar, StyleSheet, Text, View } from 'react-native';

import { SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import HomeV1 from './Components/HomeV1';


export default function App() {
  return (
     <SafeAreaProvider>
      
      <SafeAreaView className = 'flex-1' >
        <StatusBar barStyle = 'light-content'/>
          <HomeV1/>
     </SafeAreaView>
   </SafeAreaProvider>
  );
}

