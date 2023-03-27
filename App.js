import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

// React Navigations Components
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// components
import { ScreenHeaderBtn } from "./components";
import HOME from "./app/index";
import JobDetails from "./app/details/JobDetails";
import JobSearch from "./app/search/search";
import { COLORS, icons, images } from "./constants";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HOME}
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
              ),
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension="60%" />
              ),
              headerTitleAlign: "center",
              headerTitle: "HOME",
            }}
          />

          <Stack.Screen
            name="jobdetail"
            component={JobDetails}
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
            
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
              ),
              headerTitleAlign: "center",
              headerTitle: "Job Details",
            }}
          />

          <Stack.Screen name="jobsearch" component={JobSearch} options={{ 
            headerStyle:{backgroundColor:COLORS.lightWhite},
            headerShadowVisible:false,
            headerRight:()=>(
              <ScreenHeaderBtn iconUrl={icons.share} dimension="60%"/>
            ),
            headerTitleAlign:'center',
            headerTitle:"Job Search"
           }}
           />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
