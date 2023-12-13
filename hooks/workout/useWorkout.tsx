import { DocumentSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { getToday } from "../../helpers/dates";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WorkoutObject = { [key: string]: string[] };

export const useWorkout = () => {
  const [workout, setWorkout] = useState<WorkoutObject>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "trainings", "CXHbhEaOotF1b5bDpmBM");
        const docSnap = await getDoc(docRef);
        const currentStrategie = docSnap.data()?.strategies.force; // TODO: Add new strategies

        const lastWorkout = currentStrategie.lastWorkout;
        const division = currentStrategie.division;

        setWorkout(division[lastWorkout + 1] ?? division[0]);
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const completeWorkout = useCallback(
    async (cb: (value: void) => void | PromiseLike<void>) => {
      await AsyncStorage.setItem("today", getToday());

      const workoutRef = doc(
        db,
        "/trainings/CXHbhEaOotF1b5bDpmBM/workouts",
        "TqZkbA8dQxXTnVMXQTEP"
      );

      await updateDoc(workoutRef, {
        finished: true,
      })
        .then(
          cb
          //
        )
        .catch(() => {});
    },
    []
  );

  const workoutName = Object.keys(workout)[0];
  return {
    workout: workout[workoutName],
    workoutName,
    completeWorkout,
  };
};
