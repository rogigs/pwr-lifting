import {
  Button,
  ButtonText,
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
  ButtonIcon,
  AddIcon,
  VStack,
} from "@gluestack-ui/themed";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../firebase/config";
import useExercises from "../../hooks";
import { Questions, TField } from "./components";

type TModalWorkout = {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
};

type TExercise = {
  serie: string;
  rep: string;
  weight: string;
};

const ModalWorkout = ({
  showModal,
  setShowModal,
  currentExercise,
}: TModalWorkout) => {
  const [fields, setFields] = useState<TExercise[] | []>([]);
  const [series, setSeries] = useState([0]);
  const { finishExercise } = useExercises();
  console.log(
    "🚀 ~ file: index.tsx:39 ~ ModalWorkout ~ currentExercise:",
    currentExercise
  );

  const updateExercise = async () => {
    const workoutRef = doc(
      db,
      "/trainings/CXHbhEaOotF1b5bDpmBM/workouts",
      "TqZkbA8dQxXTnVMXQTEP"
    );

    await updateDoc(workoutRef, {
      exercises: { [currentExercise]: fields },
    })
      .then(async () => {
        await finishExercise(currentExercise);
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFields = (idx: number, text: string, field: TField) => {
    setFields((prevState: TExercise[] | []) => {
      let arr: TExercise[] | [] = [...prevState];

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
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
            onPress={updateExercise}
          >
            <ButtonText>Confirmar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWorkout;
