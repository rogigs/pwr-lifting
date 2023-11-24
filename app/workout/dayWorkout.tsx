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
import { db } from "../../firebase/config";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function DayWorkout() {
  const [dayWorkout, setWorkout] = useState();

  const { push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "trainings", "CXHbhEaOotF1b5bDpmBM");
        const docSnap = await getDoc(docRef);
        const actualStrategie = docSnap.data().strategies.force;

        const workout = actualStrategie.division.length + 1;

        if (workout > actualStrategie.lastWorkout) {
          setWorkout(Object.keys(actualStrategie.division[0])[0]);
        } else {
          setWorkout(Object.keys(workout)[0]);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const goToMarkWorkout = () => {
    push("/workout/workout");
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
        <Box bg="$white" p="$4" m="$4">
          <Text>Hoje é dia de {dayWorkout}</Text>
        </Box>
        <Button
          variant="solid"
          size="lg"
          action="secondary"
          onPress={goToMarkWorkout}
        >
          <ButtonText>Começar a marcar o progresso</ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </Button>
      </Box>
    </VStack>
  );
}
