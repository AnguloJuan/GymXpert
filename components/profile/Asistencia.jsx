import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { CircleDot } from "lucide-react-native";

const Asistencia = (props) => {
    const {
        date,
        hours
    } = props;

    return (
        <HStack gap={8} alignItems="center">
            <CircleDot size={20} color="#5d79ec" />
            <VStack>
                <Text fontSize={16} fontWeight="$medium">{date}</Text>
                <HStack>
                    <Text fontSize={16}>Horario: </Text>
                    <Text fontSize={16}>{hours}</Text>
                </HStack>
            </VStack>
        </HStack>
    );
};

export default Asistencia;
