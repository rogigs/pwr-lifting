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
import { useWorkout } from "../../hooks/workout/useWorkout";

export default function DayWorkout() {
  const { workoutName } = useWorkout();

  const { push } = useRouter();

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
          <Text>Hoje é dia de {workoutName}</Text>
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
