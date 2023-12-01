import { Text, Box, Center, Image, Button, ButtonText, ButtonIcon, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { Check, Pencil, Phone, UserIcon } from "lucide-react-native";
import Payment from "../components/profile/Payment";
import Asistencia from "../components/profile/Asistencia";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState({
        name: "",
        status: "",
        phone: "",
        email: "",
        emergency: "",
        blood: "",
        asistencias: [],
        payments: []
    });
    let user1 = {// Temporal
        name: "Alanna Spinka",
        status: "Activo",
        phone: "6125229115",
        email: "kziemann@yahoo.com",
        emergency: "6121874995",
        blood: "A-",
        asistencias: [
            { date: "Lunes", hours: "15hrs - 16hrs" },
            { date: "Martes", hours: "15hrs - 16hrs" },
        ],
        payments: [
            { date: "Noviembre", payment: "Mensual" },
            { date: "Octubre", payment: "Mensual" },
            { date: "Agosto", payment: "Mensual" },
        ]
    }
    useEffect(() => {
        setUser(user1);
    }, []);
    return (
        <ScrollView width={"$full"} centerContent p={24} sx={{ _text: "#5d596c" }}>
            <Box gap={24}>
                <Center p={24} bg="$white" w={"$full"} rounded={8} gap={8}>
                    <Image source={require("../assets/avatars/5.png")} borderRadius={8} />
                    <Text fontSize={24} fontWeight="$semibold">{user.name}</Text>
                    <Button gap={8} rounded={8} mt={16}>
                        <ButtonIcon as={Pencil} />
                        <ButtonText>Editar Información</ButtonText>
                    </Button>
                </Center>
                <Box bg="$white" w={"$full"} rounded={8} gap={8} p={24}>
                    <Text fontSize={18} fontWeight="$medium" mb={16}>Información</Text>
                    <HStack gap={8}>
                        <UserIcon size={20} color="#5d596c" />
                        <Text fontSize={16} fontWeight="$medium">Nombre completo: </Text>
                        <Text fontSize={16}>{user.name}</Text>
                    </HStack>
                    <HStack gap={8}>
                        <Check size={20} color="#5d596c" />
                        <Text fontSize={16} fontWeight="$medium">Status: </Text>
                        <Text fontSize={16}>{user.status}</Text>
                    </HStack>
                    <Text fontSize={18} fontWeight="$normal" my={16}>Contacto</Text>
                    <HStack gap={8}>
                        <Phone size={20} color="#5d596c" />
                        <Text fontSize={16} fontWeight="$medium">Telefono: </Text>
                        <Text fontSize={16}>{user.phone}</Text>
                    </HStack>
                    <HStack gap={8}>
                        <UserIcon size={20} color="#5d596c" />
                        <Text fontSize={16} fontWeight="$medium">Correo: </Text>
                        <Text fontSize={16}>{user.email}</Text>
                    </HStack>
                    <HStack gap={8}>
                        <UserIcon size={20} color="#5d596c" />
                        <Text fontSize={16} fontWeight="$medium">Emergencia: </Text>
                        <Text fontSize={16}>{user.emergency}</Text>
                    </HStack>
                    <Text fontSize={18} fontWeight="$normal" my={16}>Salud</Text>
                    <HStack gap={8}>
                        <UserIcon size={20} color="#5d596c" />
                        <Text fontSize={16} fontWeight="$medium">Tipo de sangre: </Text>
                        <Text fontSize={16}>{user.blood}</Text>
                    </HStack>
                </Box>
                {user.asistencias.length > 0 ? null :
                    <Box bg="$error100" w={"$full"} rounded={8} p={12}>
                        <Text fontSize={16} fontWeight="$normal" color={"$error400"}>No hay asistencias</Text>
                    </Box>
                }
                <Box bg="$white" w={"$full"} rounded={8} gap={8} p={24}>
                    <Text fontSize={18} fontWeight="$medium" mb={16}>Asistencias</Text>
                    <VStack gap={24}>
                        {user.asistencias.map((asistencia, index) => (
                            <Asistencia key={index} date={asistencia.date} hours={asistencia.hours} />
                        ))
                        }
                    </VStack>
                </Box>
                {user.payments.length > 0 ? null :
                    <Box bg="$error100" w={"$full"} rounded={8} p={12}>
                        <Text fontSize={16} fontWeight="$normal" color={"$error400"}>No hay pago</Text>
                    </Box>
                }
                <Box bg="$white" w={"$full"} rounded={8} gap={8} p={24}>
                    <Text fontSize={18} fontWeight="$medium" mb={16}>Pagos</Text>
                    <VStack gap={24}>
                        {user.payments.map((payment, index) => (
                            <Payment key={index} date={payment.date} payment={payment.payment} />
                        ))
                        }
                    </VStack>
                </Box>
            </Box>
        </ScrollView>
    );
}