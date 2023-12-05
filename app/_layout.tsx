import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
export { ErrorBoundary } from "expo-router";
import { FontResolver } from "@gluestack-style/react";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    console.log("erro", error);

    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    console.log("loaded", loaded);
  }, [loaded]);

  if (!loaded) {
    console.log("Hire");

    return null;
  }

  console.log("Nunca");

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="workout/home" options={{ headerShown: false }} />
        <Stack.Screen
          name="workout/dayWorkout"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="workout/workout"
          options={{ headerTitle: "Workout" }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
