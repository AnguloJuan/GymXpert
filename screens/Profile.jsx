import { Box, Button, ButtonIcon, ButtonText, Center, HStack, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Check, Droplet, Mail, Pencil, Phone, UserIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import Asistencia from "../components/profile/Asistencia";
import EditUserModal from "../components/profile/EditUserModal";
import Payment from "../components/profile/Payment";
import axios from "axios";
import { BASE_URL } from "../Constants";

export default function Profile() {
    const [user, setUser] = useState({
        id: 0,
        name: "",
        is_active: 0,
        phone: "",
        email: "",
        emergency_phone: "",
        blood_group: {
            id: 0,
            name: ""
        },
        attended_sessions: [],
        payments: []
    });
    const [showEditModal, setShowEditModal] = useState(false);

    /*let user1 = {// Temporal
        name: "Alanna Spinka",
        is_active: "Activo",
        phone: "6125229115",
        email: "kziemann@yahoo.com",
        emergency_phone: "6121874995",
        blood_gropup: {
            id: 2,
            name: "A-"
        },
        attended_sessions: [
            {
                session_day: {
                    week_day: {
                        id: 3,
                        name: "Miércoles"
                    },
                    start_hour: 13,
                    end_hour: 14,
                    current_capacity: 17
                },
                attendance_date: "2023-10-25",
                attended: 0
            },
        ],
        payments: [
            {
                fare: {
                    name: "Diciembre",
                },
                payment_type: {
                    name: "Transferencia",
                    created_at: "2021-09-30T00:00:00.000000Z",
                },
            },
            {
                fare: {
                    name: "Enero",
                },
                payment_type: {
                    name: "Transferencia",
                    created_at: "2021-09-30T00:00:00.000000Z",
                },
            }
        ]
    }*/

    let user_id = 1; // Temporal
    useEffect(() => {
        //setUser(user1);
        // Get user data from API
        axios.get(`${BASE_URL}/customers/${user_id}`)
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ScrollView width={"$full"} centerContent p={24} sx={{ _text: { color: "#5d596c" } }}>
            <Box gap={24}>
                <Center p={24} bg="$white" w={"$full"} rounded={8} gap={8}>
                    <Image source={require("../assets/avatars/5.png")} alt="Profile pic" borderRadius={8} />
                    <Text fontSize={24} fontWeight="$semibold">{user.name}</Text>
                    <Button
                        gap={8}
                        rounded={8}
                        mt={16}
                        onPress={() => setShowEditModal(true)}>
                        <ButtonIcon as={Pencil} />
                        <ButtonText>Editar Información</ButtonText>
                    </Button>
                </Center>
                <Box bg="$white" w={"$full"} rounded={8} gap={8} p={24}>
                    <Text fontSize={18} fontWeight="$medium" mb={16}>Información</Text>
                    <HStack gap={8} alignItems="center">
                        <Box minWidth={20}>
                            <UserIcon size={20} color="#5d596c" />
                        </Box>
                        <Text fontSize={16} fontWeight="$medium">Nombre completo: </Text>
                        <Text fontSize={16}>{user.name}</Text>
                    </HStack>
                    <HStack gap={8} alignItems="center">
                        <Box minWidth={20}>
                            <Check size={20} color="#5d596c" />
                        </Box>
                        <Text fontSize={16} fontWeight="$medium">Status: </Text>
                        <Text fontSize={16}>{user.is_active ? "Activo" : "Inactivo"}</Text>
                    </HStack>
                    <Text fontSize={18} fontWeight="$normal" my={16}>Contacto</Text>
                    <HStack gap={8} alignItems="center">
                        <Box minWidth={20}>
                            <Phone size={20} color="#5d596c" />
                        </Box>
                        <Text fontSize={16} fontWeight="$medium">Teléfono: </Text>
                        <Text fontSize={16}>{user.phone}</Text>
                    </HStack>
                    <HStack gap={8} alignItems="center">
                        <Box minWidth={20}>
                            <Mail size={20} color="#5d596c" />
                        </Box>
                        <Text fontSize={16} fontWeight="$medium">Correo: </Text>
                        <Text fontSize={16}>{user.email}</Text>
                    </HStack>
                    <HStack gap={8} alignItems="center">
                        <Box minWidth={20}>
                            <Phone size={20} color="#5d596c" />
                        </Box>
                        <Text fontSize={16} fontWeight="$medium">Emergencia: </Text>
                        <Text fontSize={16}>{user.emergency_phone}</Text>
                    </HStack>
                    <Text fontSize={18} fontWeight="$normal" my={16}>Salud</Text>
                    <HStack gap={8} alignItems="center">
                        <Box minWidth={20}>
                            <Droplet size={20} color="#5d596c" />
                        </Box>
                        <Text fontSize={16} fontWeight="$medium">Tipo de sangre: </Text>
                        <Text fontSize={16}>{user.blood_group.name}</Text>
                    </HStack>
                </Box>
                {user.attended_sessions.length > 0 ? null :
                    <Box bg="$error100" w={"$full"} rounded={8} p={12}>
                        <Text fontSize={16} fontWeight="$normal" color={"$error400"}>No hay asistencias</Text>
                    </Box>
                }
                <Box bg="$white" w={"$full"} rounded={8} gap={8} p={24}>
                    <Text fontSize={18} fontWeight="$medium" mb={16}>Asistencias</Text>
                    <VStack gap={24}>
                        {// Show the latest 5 attended sessions
                            user.attended_sessions.slice(0, 5).reverse().map((session, index) => (
                                <Asistencia key={index}
                                    date={session.session_day.week_day.name}
                                    start_hour={session.session_day.start_hour}
                                    end_hour={session.session_day.end_hour}
                                />
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
                        {user.payments.slice(0, 5).reverse().map((payment, index) => (
                            <Payment key={index} date={payment.fare.name} payment={payment.payment_type.name} />
                        ))
                        }
                    </VStack>
                </Box>
            </Box>

            <EditUserModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                user={user}
                setUser={setUser}
            />

        </ScrollView>
    );
}