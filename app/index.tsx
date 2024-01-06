import { useRouter } from "expo-router";
import {
  VStack,
  InputField,
  Button,
  ButtonText,
  Input,
  Text,
  Center,
} from "@gluestack-ui/themed";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Alert } from "react-native";
type Inputs = {
  username: string;
  password: string;
};

export default function Page() {
  const { register, setValue, handleSubmit } = useForm<Inputs>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => Alert.alert(data.username);

  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

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
          placeholder="username"
          onChangeText={(text) => setValue("username", text)}
        />
      </Input>
      <Input>
        <InputField
          placeholder="password"
          onChangeText={(text) => setValue("password", text)}
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
        onPress={() => push("workout/home")}
      >
        <ButtonText>Criar conta</ButtonText>
      </Button>
    </VStack>
  );
}
