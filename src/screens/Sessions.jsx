import { Center, ScrollView, Spinner, Text } from "@gluestack-ui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL  from "../../Constants";
import SessionComponent from "../components/sessions/Session";
import ConfirmInscription from "../components/sessions/ConfirmInscriptionModal";
export default function Sessions({ navigation }) {
    const [sessions, setSessions] = useState([]);
    /*setSession([
        {
            id: 1,
            instructor: { name: "Albert Cook" },
            session: {
                name: "Yoga",
                description: "Haz que cada movimiento cuente, entrena para la vida diaria\n\n" +
                    "Capacidad: 40 personas\n\n" +
                    "Reservado: 30 personas\n\n" +
                    "Disponible: 10 personas\n",
            }
        },
        {
            id: 2,
            instructor: { name: "Albert Cook" }
            session: {
                name: "Pesas",
                description: "Haz que cada movimiento cuente, entrena para la vida diaria\n\n" +
                    "Capacidad: 40 personas\n\n" +
                    "Reservado: 30 personas\n\n" +
                    "Disponible: 10 personas\n",
            }
        },
        {
            id: 3,
            instructor: {name: "John Doe" }
            session: {
                name: "Cardio",
                description: "Haz que cada movimiento cuente, entrena para la vida diaria\n\n" +
                    "Capacidad: 40 personas\n\n" +
                    "Reservado: 30 personas\n\n" +
                    "Disponible: 10 personas\n",
            }
        },
    ]);*/
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);
    const [sessionId, setSessionId] = useState(0);
    let sessionsList = [];

    // Fetch classes from backend with axios
    useEffect(() => {
        axios.get(`${BASE_URL}/session-days`)
            .then((response) => {
                sessionsList = response.data.data;
                // set first 5 sessions
                setSessions(sessionsList.slice(0, 5));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={24} p={24}>
                    <Text fontSize={24} fontWeight="$medium" my={12} color="#5d596c">Clases disponibles</Text>

                    {sessions.length !== 0 ? sessions.map((session) => (
                        <SessionComponent
                            session={session}
                            navigation={navigation}
                            setShowInscriptionModal={setShowInscriptionModal}
                            setSessionId={setSessionId}
                            key={session.id}
                        />
                    )) : <Spinner />}
                </Center>
                {sessions.length !== 0 && sessionId !== 0 && (
                    <ConfirmInscription
                        showInscriptionModal={showInscriptionModal}
                        setShowInscriptionModal={setShowInscriptionModal}
                        session={sessions.find((session) => session.id === sessionId)}
                    />
                )}
            </ScrollView>

        </>
    );
}