import {
  Text,
  VStack,
  HStack,
  Button,
  ButtonText,
  ButtonIcon,
  AddIcon,
  Box,
} from "@gluestack-ui/themed";
import { useModal } from "../../../../components/Modal";

type ListExerciseProps = {
  workout: string[];
  setCurrentExercise: React.Dispatch<React.SetStateAction<string | undefined>>;
  exercisesToDrop: { [key: string]: string } | Record<string, never>;
};

export const ListExercise = ({
  workout,
  setCurrentExercise,
  exercisesToDrop,
}: ListExerciseProps) => {
  const { setShowModal } = useModal();

  if (!workout) {
    return null;
  }

  return workout.map((exercise) => {
    const attributesUI = exercisesToDrop?.[exercise]
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
            variant={attributesUI.buttonVariant as "outline" | "solid"}
            size="sm"
            action={attributesUI.buttonAction as "positive" | "primary"}
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
