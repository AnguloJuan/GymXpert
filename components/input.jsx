//Input with bootstrap styling
import { Box, Input, InputField, Text } from "@gluestack-ui/themed";

const StyledInput = (props) => {
  const {
    id,
    type,
    contentType,
    label,
    placeholder,
    required,
    disabled,
    autoComplete,
    onChange,
    value
  } = props;
  
  var { invalid } = props;
  if (!invalid) {
    invalid = false;
  }

  return (
    id !== "" && (
      <>
        <Box my={6}>
          <Text color="#5d596c" fontSize={14} lineHeight={24} >
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
              type={type}
              textContentType={contentType}
              secureTextEntry={type == "password" ? true : false}
              color="#5d596c"
              placeholderTextColor={"#6f6b7d"}
              borderWidth={1}
              bgColor="$white"
              borderColor="rgb(219, 218, 222)"
              value={value}
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
