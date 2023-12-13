import { useRouter } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  const { push } = useRouter();

  return <Text onPress={() => push("workout/home")}>Home page</Text>;
}
