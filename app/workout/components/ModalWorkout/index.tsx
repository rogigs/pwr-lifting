import {
  HStack,
  Button,
  ButtonText,
  Box,
  Modal,
  ModalContent,
  ModalBackdrop,
  Heading,
  ModalCloseButton,
  ModalFooter,
  Icon,
  ModalHeader,
  ModalBody,
  CloseIcon,
  Input,
  InputField,
  ButtonIcon,
  AddIcon,
  VStack,
} from "@gluestack-ui/themed";
import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../../../../firebase/config";

interface ModalWorkoutI {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  exercise: string;
  setfinishedExercise: (state: string) => void;
}

interface ExerciseI {
  serie: string;
  rep: string;
  weight: string;
}

interface QuestionsI {
  handleFields: (
    idx: number,
    text: string,
    field: "serie" | "rep" | "weight"
  ) => void;
  idx: number;
}

const Questions = ({ handleFields, idx }: QuestionsI) => {
  return (
    <HStack space="lg">
      <Box w="$20">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Série"
            onChangeText={(text) => handleFields(idx, text, "serie")}
          />
        </Input>
      </Box>
      <Box w="$20">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Rep"
            onChangeText={(text) => handleFields(idx, text, "rep")}
          />
        </Input>
      </Box>
      <Box w="$20">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Weight"
            onChangeText={(text) => handleFields(idx, text, "weight")}
          />
        </Input>
      </Box>
    </HStack>
  );
};

const ModalWorkout = ({
  showModal,
  setShowModal,
  exercise,
  setfinishedExercise,
}: ModalWorkoutI) => {
  const ref = useRef(null);

  const [fields, setFields] = useState<ExerciseI[] | []>([]);
  const [series, setSeries] = useState([0]);

  const updateExercise = async () => {
    const workoutRef = doc(
      db,
      "/trainings/CXHbhEaOotF1b5bDpmBM/workouts",
      "hPK5XLMJHDkBD8nmn3M8"
    );
    await updateDoc(workoutRef, {
      exercises: { [exercise]: fields },
    });
  };

  const handleFields = (
    idx: number,
    text: string,
    field: "serie" | "rep" | "weight"
  ) => {
    setFields((state: ExerciseI[] | []) => {
      let arr: ExerciseI[] | [] = state;

      if (arr[idx]) {
        arr[idx] = { ...arr[idx], [field]: text };

        return arr;
      }

      arr.push({ [field]: text });

      return arr;
    });
  };

  const oneMoreSerie = () => {
    setSeries((prevSeries) => [...prevSeries, prevSeries.length]);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      finalFocusRef={ref}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Informações sobre suas séries</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack space="md">
            {series.map((serie) => (
              <Questions key={serie} handleFields={handleFields} idx={serie} />
            ))}
            <Button
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={oneMoreSerie}
            >
              <ButtonText>Add </ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(false);
            }}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              setShowModal(false);
              updateExercise();
              setfinishedExercise(exercise);
            }}
          >
            <ButtonText>Confirmar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWorkout;
