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
import { useCallback, useState } from "react";
import ModalWorkout from "./components/ModalWorkout"; // Lazy
import { useRouter } from "expo-router";
import { useWorkout } from "../../hooks/workout/useWorkout";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ExerciseData = {
  [exerciseName: string]: {
    serie: string;
    rep: string;
    weight: string;
  };
};

type ListExerciseProps = {
  workout: string[];
};

const ListExercise = ({
  workout,
  setShowModal,
  setCurrentExercise,
  exercisesToDrop,
}: ListExerciseProps) => {
  if (!workout) {
    return null;
  }

  return workout.map((exercise) => {
    const attributesUI = exercisesToDrop[exercise]
      ? {
          buttonVariant: "solid",
          buttonAction: "positive",
        }
      : {
          buttonVariant: "outline",
          buttonAction: "primary",
        };

    return (
      <HStack key={exercise}>
        <Box w="$2/3">
          <Text>{exercise}</Text>
        </Box>
        <Box w="$1/3">
          <Button
            variant={attributesUI.buttonVariant}
            size="sm"
            action={attributesUI.buttonAction}
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
    );
  });
};

export default function Workout() {
  const { workout, completeWorkout } = useWorkout();

  const [showModal, setShowModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<string>();
  const [exercisesToDrop, setExercisesToDrop] = useState({});

  const { push } = useRouter();

  const finishExercise = async (exerciseData: ExerciseData) => {
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
      <ModalWorkout
        showModal={showModal}
        setShowModal={setShowModal}
        currentExercise={currentExercise}
        finishExercise={finishExercise}
      />
      <VStack sx={{ margin: 8 }} space="md">
        <ListExercise
          workout={workout}
          setShowModal={setShowModal}
          setCurrentExercise={setCurrentExercise}
          exercisesToDrop={exercisesToDrop}
        />
      </VStack>

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
