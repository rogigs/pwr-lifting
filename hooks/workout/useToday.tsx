import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { getToday } from "../../helpers/dates";

export const useToday = () => {
  const [today, setToday] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const today = await AsyncStorage.getItem("today");

        setToday(today === getToday());
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  return { isToday: today };
};
