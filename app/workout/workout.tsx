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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToday } from "../../helpers/dates";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useExercises from "./hooks";

export default function Workout() {
  const [showModal, setShowModal] = useState(false);
  const { push } = useRouter();
  const { exercisesFinished, setCurrentExercise, currentExercise } =
    useExercises();

  const completeWorkout = async () => {
    await AsyncStorage.setItem("today", getToday());

    const workoutRef = doc(
      db,
      "/trainings/CXHbhEaOotF1b5bDpmBM/workouts",
      "TqZkbA8dQxXTnVMXQTEP"
    );

    await updateDoc(workoutRef, {
      finished: true,
    })
      .then(() => {
        push("/workout/home");
      })
      .catch(() => {});
  };

  return (
    <ScrollView>
      <ModalWorkout
        showModal={showModal}
        setShowModal={setShowModal}
        currentExercise={currentExercise}
      />
      <VStack sx={{ margin: 8 }} space="md">
        {exercises.map((exercise) => (
          <HStack key={exercise}>
            <Box w="$2/3">
              <Text>{exercise}</Text>
            </Box>
            <Box w="$1/3">
              <Button
                variant={
                  (exercisesFinished[exercise] as TFinishedExercise)
                    ? "solid"
                    : "outline"
                }
                size="sm"
                action={
                  (exercisesFinished[exercise] as TFinishedExercise)
                    ? "positive"
                    : "primary"
                }
                onPress={() => {
                  setCurrentExercise(exercise);
                  setShowModal(true);
                }}
              >
                <ButtonText>Séries</ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
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
        <ButtonText>Completar treino</ButtonText>
        <ButtonIcon as={CheckIcon} />
      </Button>
    </ScrollView>
  );
}
