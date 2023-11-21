import { HStack, Box, Input, InputField } from "@gluestack-ui/themed";

export type TField = "serie" | "rep" | "weight";

type TQuestions = {
  handleFields: (idx: number, text: string, field: TField) => void;
  idx: number;
};

export const Questions = ({ handleFields, idx }: TQuestions) => {
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
