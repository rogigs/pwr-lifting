import {
  Button,
  ButtonText,
  Heading,
  Icon,
  CloseIcon,
  ButtonIcon,
  AddIcon,
  VStack,
} from "@gluestack-ui/themed";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../firebase/config";
import { Questions, TField } from "./components";
import { Modal, useModal } from "../../../../components/Modal";
import { ExerciseData } from "../../workout";

type TModalWorkout = {
  currentExercise: string | undefined;
  finishExercise: (exerciseData: ExerciseData) => Promise<void>;
};

type TExercise = {
  serie: string;
  rep: string;
  weight: string;
};

const ModalWorkout = ({ currentExercise, finishExercise }: TModalWorkout) => {
  const [fields, setFields] = useState<TExercise[] | []>([]);
  const [series, setSeries] = useState([0]);
  const { setShowModal } = useModal();

  const updateExercise = async () => {
    await finishExercise({ [currentExercise]: fields[0] });
    // const workoutRef = doc(
    //   db,
    //   "/trainings/CXHbhEaOotF1b5bDpmBM/workouts",
    //   "TqZkbA8dQxXTnVMXQTEP"
    // );

    // await updateDoc(workoutRef, {
    //   exercises: { [currentExercise]: fields },
    // })
    //   .then(async () => {
    //

    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
    <Modal.Modal>
      <Modal.ModalHeader>
        <Heading size="lg">Informações sobre suas séries</Heading>
        <Modal.ModalCloseButton>
          <Icon as={CloseIcon} />
        </Modal.ModalCloseButton>
      </Modal.ModalHeader>
      <Modal.ModalBody>
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
      </Modal.ModalBody>
      <Modal.ModalFooter>
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
      </Modal.ModalFooter>
    </Modal.Modal>
  );
};

export default ModalWorkout;
