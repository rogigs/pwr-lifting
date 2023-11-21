import { useState } from "react";

type TFinishedExercise = Record<string, string | undefined>;

const useExercises = () => {
  const [currentExercise, setCurrentExercise] = useState("");
  const [exercisesFinished, setExercisesFinished] = useState<
    TFinishedExercise | {}
  >({});

  const finishExercise = (exercise: string) => {
    setExercisesFinished((prevState) => ({
      ...prevState,
      exercise,
    }));

    setCurrentExercise("");
  };

  return {
    exercisesFinished,
    finishExercise,
    currentExercise,
    setCurrentExercise,
  };
};

export default useExercises;
