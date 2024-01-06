import { useRouter } from "expo-router";
import {
  VStack,
  InputField,
  Button,
  ButtonText,
  Input,
  Text,
} from "@gluestack-ui/themed";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useUser } from "../hooks/useUser";

type Inputs = {
  email: string;
  password: string;
};

export default function Page() {
  const { register, setValue, handleSubmit } = useForm<Inputs>();
  const { push } = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setUser(user.uid);
        push("/workout/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      });
  };

  return (
    <VStack
      space="lg"
      h="100%"
      justifyContent="center"
      paddingLeft="$4"
      paddingRight="$4"
    >
      <Text fontWeight="$bold" size="6xl">
        PwrLifting
      </Text>
      <Input>
        <InputField
          placeholder="email"
          onChangeText={(text) => setValue("email", text)}
        />
      </Input>
      <Input>
        <InputField
          placeholder="password"
          onChangeText={(text) => setValue("password", text)}
          type="password"
        />
      </Input>
      <Text fontWeight="$bold" underline>
        Trocar senha
      </Text>

      <Button
        variant="solid"
        size="lg"
        action="positive"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText>Logar</ButtonText>
      </Button>
      <Button
        variant="outline"
        size="lg"
        action="positive"
        onPress={() => push("/createAccount")}
      >
        <ButtonText>Criar conta</ButtonText>
      </Button>

      <Button
        variant="outline"
        size="lg"
        action="positive"
        onPress={() => push("/workout/home")}
      >
        <ButtonText>FOR DEV</ButtonText>
      </Button>
    </VStack>
  );
}
