import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store"
import { useFonts } from "expo-font"
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import "./global.css"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Bungee-Regular": require("../assets/fonts/Bungee-Regular.ttf")
  })


  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
        <Stack screenOptions={{ headerShown: false, headerTitleAlign: "center" }}/>
    </Provider>
  )
}
