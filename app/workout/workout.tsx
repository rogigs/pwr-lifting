import {
  VStack,
  Button,
  ButtonText,
  ButtonIcon,
  ScrollView,
  CheckIcon,
} from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import ModalWorkout from "./components/ModalWorkout"; // Lazy
import { useRouter } from "expo-router";
import { useWorkout } from "../../hooks/workout/useWorkout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalProvider } from "../../components/Modal";
import { ListExercise } from "./components/ListExercises";

export type ExerciseData = {
  [exerciseName: string]: {
    serie: string;
    rep: string;
    weight: string;
  };
};

export default function Workout() {
  const { workout, completeWorkout } = useWorkout();

  const [currentExercise, setCurrentExercise] = useState<string>();
  const [exercisesToDrop, setExercisesToDrop] = useState({});

  const { push } = useRouter();

  const finishExercise = async (exerciseData: ExerciseData): Promise<void> => {
    const todayWorkout = await AsyncStorage.getItem("todayWorkout");

    await AsyncStorage.setItem(
      "todayWorkout",
      JSON.stringify(
        todayWorkout
          ? { ...JSON.parse(todayWorkout), ...exerciseData }
          : JSON.stringify(exerciseData)
      )
    );

    setExercisesToDrop((prevState) => ({
      ...prevState,
      currentExercise,
    }));

    setCurrentExercise("");
  };

  const cbOfCompleteWorkout = useCallback(() => {
    completeWorkout(async () => {
      await AsyncStorage.setItem("todayWorkout", "");

      push("/workout/home");
    });
  }, []);

  // TODO: UseEffect to get storage

  return (
    <ScrollView>
      <ModalProvider>
        <ModalWorkout
          currentExercise={currentExercise}
          finishExercise={finishExercise}
        />
        <VStack sx={{ margin: 8 }} space="md">
          <ListExercise
            workout={workout}
            setCurrentExercise={setCurrentExercise}
            exercisesToDrop={exercisesToDrop}
          />
        </VStack>
      </ModalProvider>

      <Button
        variant="solid"
        size="lg"
        action="positive"
        onPress={cbOfCompleteWorkout}
      >
        <ButtonText>Completar treino</ButtonText>
        <ButtonIcon as={CheckIcon} />
      </Button>
    </ScrollView>
  );
}
