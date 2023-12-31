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
import { getToday } from "../../helpers/dates";
import { useToday } from "../../hooks/workout/useToday";

const TrainingCompleted = () => {
  return (
    <Box bg="$success0" p="$4">
      <Text>Treino de hoje já está concluído. Parabéns!</Text>
    </Box>
  );
};

const TrainingToComplete = () => {
  const { push } = useRouter();

  const addDay = async () => {
    push("/workout/dayWorkout");

    // TODO: change rules to visibility
    // await addDoc(collection(db, "trainings/CXHbhEaOotF1b5bDpmBM/workouts"), {
    //   day: getToday(),
    // })
    //   .then(() => {})
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  return (
    <Button variant="solid" size="lg" action="secondary" onPress={addDay}>
      <ButtonText>Começar treino</ButtonText>
      <ButtonIcon as={ArrowRightIcon} />
    </Button>
  );
};

export default function Home() {
  const { isToday } = useToday();

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
        {isToday ? <TrainingCompleted /> : <TrainingToComplete />}
      </Box>
    </VStack>
  );
}
