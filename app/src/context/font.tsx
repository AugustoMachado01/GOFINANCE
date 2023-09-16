import * as Font from 'expo-font'
import { View } from "react-native";
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useCallback, useEffect, useState } from "react";

import {Poppins_500Medium, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'

interface FontProviderProps{
    children: ReactNode
}

export function FontProvider({children}:FontProviderProps){
    const [appIsReady, setAppIsReady] = useState(false)

    useEffect(() => {
        async function prepare(){
            try{
                await SplashScreen.preventAutoHideAsync()
                await Font.loadAsync({
                    Poppins_400Regular,
                    Poppins_500Medium,
                    Poppins_700Bold
                })
            }
            catch(error){
                console.error(error)
            }
            finally{
                setAppIsReady(() => true)
            }
        }
        prepare()
    }, [appIsReady])

    const onLayoutRootView = useCallback(async () => {
        if(appIsReady) {
          await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
        
    if (!appIsReady) {
        return null;
    }

    return(
        <View onLayout={onLayoutRootView} style={{flex: 1}}>
            {children}
        </View>
    )
}