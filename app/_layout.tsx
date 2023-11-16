import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config as configGluestack } from "@gluestack-ui/config";
export { ErrorBoundary } from "expo-router";
import { FontResolver } from "@gluestack-style/react";

export const unstable_settings = {
  initialRouteName: "workout/home",
};

SplashScreen.preventAutoHideAsync();

const config = {
  ...configGluestack,
  plugins: [
    new FontResolver({
      mapFonts: (style) => {
        style.fontFamily = "Nunito Sans";
        style.fontWeight = 800;
        style.fontStyle = "italic";
      },
    }),
  ],
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="workout/home" options={{ headerShown: false }} />
        <Stack.Screen name="workout/workout" />
      </Stack>
    </GluestackUIProvider>
  );
}
