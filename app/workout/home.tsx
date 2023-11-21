import {
  Button,
  ButtonText,
  ButtonIcon,
  VStack,
  Image,
  Box,
  ArrowRightIcon,
  Text,
} from "@gluestack-ui/themed";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getToday } from "../../helpers/dates";

export default function BeginWorkout() {
  const [today, setToday] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const today = await AsyncStorage.getItem("today");

        setToday(today !== getToday());
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const addDay = async () => {
    await addDoc(collection(db, "trainings/CXHbhEaOotF1b5bDpmBM/workouts"), {
      day: getToday(),
    })
      .then(() => {
        push("/workout/workout");
      })
      .catch(() => {});
  };

  return (
    <VStack>
      <Image
        size="full"
        source={{
          uri: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=1609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        alt="Image gym"
        sx={{
          position: "relative",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {today ? (
          <Box bg="$success0" p="$4">
            <Text>Treino de hoje já está concluído. Parabéns!</Text>
          </Box>
        ) : (
          <Button variant="solid" size="lg" action="secondary" onPress={addDay}>
            <ButtonText>Começar treino</ButtonText>
            <ButtonIcon as={ArrowRightIcon} />
          </Button>
        )}
      </Box>
    </VStack>
  );
}
