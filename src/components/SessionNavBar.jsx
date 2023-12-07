import { Box, Button, ButtonIcon, HStack, Text } from "@gluestack-ui/themed";
import { Calendar, CalendarCheck } from "lucide-react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SessionNavBar({ showEnrolled, setShowEnrolled, setSessions, sessionsList }) {
    const { user } = useContext(AuthContext);
    const subscriptions = sessionsList.filter((session) => session.participants.find((participant) => participant.customer.id === user.id));
    return (
        <HStack
            position="relative"
            top={0}
            left={0}
            right={0}
            zIndex={1}
            bg="white"
            shadow="md"
            px={4}
            py={2}
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
        >
            <Button
                onPress={() => {
                    setShowEnrolled(false)
                    setSessions(sessionsList)
                }}
                disabled={showEnrolled === false}
                variant="link"
            >
                <ButtonIcon as={Calendar} name="arrow-left" size={24} />
                <Text fontSize={20} fontWeight="$medium" color="#5d596c">Clases</Text>
            </Button>
            <Button
                onPress={() => {
                    setShowEnrolled(true)
                    setSessions(subscriptions)
                }}
                disabled={showEnrolled === true}
                variant="link"
            >
                <ButtonIcon as={CalendarCheck} name="menu" size={24} />
                <Text fontSize={20} fontWeight="$medium" color="#5d596c">Clases Inscritas</Text>
            </Button>
        </HStack>
    );
}
