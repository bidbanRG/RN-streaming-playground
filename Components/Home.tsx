import { Button, ScrollView, StyleSheet, Text, View,StatusBar } from "react-native";
import { Camera, CameraType } from "expo-camera";
import SafeAreaView from "react-native-safe-area-view";
import * as FS from 'expo-file-system';
import { Audio } from "expo-av";
import { Video } from "expo-av";
import { useEffect, useState, useRef } from "react";
export default function Home(){
   
   
   const playing = useRef<boolean>(false);
   const [allow,setAllow] = useState<boolean>(false);
   const [url,setUrl] = useState<string | undefined>("");
   const cam = useRef<Camera | null>(null);
   const vid = useRef<Video | null>(null);
   const [Isfront,setIsfront] = useState(false);
      const run = async ():Promise<void> => {
        const Status1 = await Camera.requestCameraPermissionsAsync();
        const Status2 = await Audio.requestPermissionsAsync();

        setAllow(Status1.status === 'granted' && Status2.status === 'granted');
      } 	

     const Record = async () => {
      
       // if(playing.current){
       //   cam.current?.stopRecording();
       //   playing.current = false;
       //   return;
       // }
          setTimeout(() => {
              cam.current?.stopRecording();
          },1500);
       // playing.current = true;
       const obj = await cam.current?.recordAsync();

        setUrl(obj?.uri);
         
        
     }
  useEffect(() => {
     
     

   let interval:NodeJS.Timer;
  (async()=>{
    const obj = await cam.current?.recordAsync();
     interval = setInterval(()=>{
        cam.current?.stopRecording();
        
     })
  
  })()
    

  },[])
  // useEffect(() => {
  //    let timeOut:NodeJS.Timeout;

  //    const fun = async () => {
  //   if(playing.current){
        
  //       // const obj = await cam.current?.recordAsync();

  //        timeOut = setTimeout(() => {
  //              cam.current?.stopRecording();

              
  //        },2000);
      

      
  //   }
  // }
  //    fun();
  //   return () => clearTimeout(timeOut);

  // },[playing.current])

	return   <ScrollView  style = {container}>
           

	       {
	       	 allow && <Camera
	       	           ref = {(camera) => {
                          cam.current = camera
	       	           }}
                      
	       	            type = { Isfront ? CameraType.back: CameraType.front } 
	       	           style = {{height:600,width:'100%'}} 
	       	           /> 
	       }
                   {allow &&  <Button  onPress = {() => setIsfront(!Isfront)} title = 'face' />}
             <View style = {{ display:'flex',
                              flexDirection:'row',
                              justifyContent:'space-around',
                              alignItems:'center',
                              width:'100%',
                              height:60,
                              backgroundColor:'black',
                              
                             
                            }} >      
              <Button onPress = {run} title = 'camera' />
              <Button title = 'record' onPress = {Record} />
           

             </View>
              
                    <Video 
                    ref = {(video) => {
                          vid.current = video
                     }}
                     source = {{uri:url as string}}
                    style = {{
                      height:600,
                      width:'100%'
                    }}
                    useNativeControls
                   isLooping
                  />

                 
	      </ScrollView>
       
}


const styles = StyleSheet.create({
  container: {
    flex:1,

    paddingTop:StatusBar.currentHeight,
    backgroundColor: 'teal',
   
  },

});

const { container } = styles
