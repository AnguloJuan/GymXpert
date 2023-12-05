import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { CircleDot } from "lucide-react-native";

const Asistencia = (props) => {
    const {
        date,
        start_hour,
        end_hour,
    } = props;

    return (
        <HStack gap={8} alignItems="center">
            <CircleDot size={20} color="#5d79ec" />
            <VStack>
                <Text fontSize={16} fontWeight="$medium">{date}</Text>
                <HStack>
                    <Text fontSize={16}>Horario: </Text>
                    <Text fontSize={16}>{start_hour}hrs - {end_hour}hrs</Text>
                </HStack>
            </VStack>
        </HStack>
    );
};

export default Asistencia;
