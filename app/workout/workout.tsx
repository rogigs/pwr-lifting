import {
  Text,
  VStack,
  HStack,
  Button,
  ButtonText,
  ButtonIcon,
  AddIcon,
  Box,
  ScrollView,
  CheckIcon,
} from "@gluestack-ui/themed";
import { exercises } from "./utils";
import { useState } from "react";
import ModalWorkout from "./components/ModalWorkout"; // Lazy
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Workout() {
  const [showModal, setShowModal] = useState(false);
  const [finishedExercise, setfinishedExercise] = useState({});

  const completeWorkout = async () => {
    await AsyncStorage.setItem("today", "23/10/2011");
  };

  return (
    <ScrollView>
      <VStack sx={{ margin: 8 }} space="md">
        {exercises.map((exercise, idx) => (
          <HStack key={idx}>
            <Box w="$2/3">
              <Text>{exercise}</Text>
            </Box>
            <Box w="$1/3">
              <Button
                variant={finishedExercise[exercise] ? "solid" : "outline"}
                size="sm"
                action={finishedExercise[exercise] ? "positive" : "primary"}
                onPress={() => setShowModal(true)}
              >
                <ButtonText>Séries</ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
              <ModalWorkout
                exercise={exercise}
                showModal={showModal}
                setShowModal={setShowModal}
                setfinishedExercise={(exercise) =>
                  setfinishedExercise((state) => ({
                    ...state,
                    [exercise]: exercise,
                  }))
                }
              />
            </Box>
          </HStack>
        ))}
      </VStack>

      <Button
        variant="solid"
        size="lg"
        action="positive"
        onPress={completeWorkout}
      >
        <Link href="/workout/home">
          <ButtonText>Completar treino</ButtonText>
          <ButtonIcon as={CheckIcon} />
        </Link>
      </Button>
    </ScrollView>
  );
}
