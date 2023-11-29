//Input with bootstrap styling
import { Box, Input, InputField, Text } from "@gluestack-ui/themed";

const StyledInput = (props) => {
  const {
    id,
    type,
    label,
    placeholder,
    required,
    disabled,
    autoComplete,
    onChange,
  } = props;
  
  var { invalid } = props;
  if (!invalid) {
    invalid = false;
  }

  return (
    id !== "" && (
      <>
        <Box my={6}>
          <Text color="$rgb(93, 89, 108)" fontSize={14} lineHeight={24} >
            {label}
          </Text>
          <Input
            isRequired={required}
            isInvalid={invalid}
            isDisabled={disabled}
            size="sm"
            my="$2"
            borderRadius={8}
          >
            <InputField
              id={id}
              placeholder={placeholder}
              onChange={onChange}
              autoComplete={autoComplete}
              secureTextEntry={type == "password" ? true : false}
              color="$rgb(93, 89, 108)"
              placeholderTextColor={"#6f6b7d"}
              borderWidth={1}
              bgColor="$white"
              borderColor="rgb(219, 218, 222)"
              sx={{
                ":focus": {
                  borderColor: "rgb(115, 103, 240)",
                  ":invalid": {
                    borderColor: "$error600",
                  },
                },
                ":invalid": {
                  borderColor: "$error600",
                },
                ":disabled": {
                  borderColor: "rgb(219, 218, 222)",
                },
              }}
            />
          </Input>
        </Box>
      </>
    )
  );
};

export default StyledInput;
