import { Text, View } from "react-native";
import WebView from "react-native-webview";

export default function(){
    
    let num = 'tel://+7890887871'

     return <WebView source = {{
                  uri:'https://video-call-kappa.vercel.app/'
               }} 
                 javaScriptEnabled = {true}
                     styles = {{
                          flex:1    
                       }}               
                  />

     

}
