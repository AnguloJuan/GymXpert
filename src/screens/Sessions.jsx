import { Center, ScrollView, Spinner, Text } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import BASE_URL from "../../Constants";
import SessionNavBar from "../components/SessionNavBar";
import ConfirmInscription from "../components/sessions/ConfirmInscriptionModal";
import SessionComponent from "../components/sessions/Session";

export default function Sessions({ navigation, route }) {
    const [sessions, setSessions] = useState([]);
    const [sessionsList, setSessionsList] = useState([]);
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);
    const [sessionId, setSessionId] = useState(0);
    const [showEnrolled, setShowEnrolled] = useState(false);

    // Fetch classes from backend with axios
    useEffect(() => {
        BASE_URL.get("/session-days")
            .then((response) => {
                setSessionsList(response.data.data);
                setSessions(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <SessionNavBar
                showEnrolled={showEnrolled}
                setSessions={setSessions}
                setShowEnrolled={setShowEnrolled}
                sessionsList={sessionsList}
            />

            <ScrollView p={16} minHeight={"$full"}>
                <Center width="$full" bgColor="white" rounded={8} gap={24} p={24}>
                    <Text fontSize={24} fontWeight="$medium" my={12} color="#5d596c">
                        {showEnrolled ? "Clases inscritas" : "Clases disponibles"}
                    </Text>

                    {sessions.length !== 0 ? sessions.map((session) => (
                        <SessionComponent
                            session={session}
                            navigation={navigation}
                            setShowInscriptionModal={setShowInscriptionModal}
                            setSessionId={setSessionId}
                            showEnrolled={showEnrolled}
                            key={session.id}
                        />
                    )) : <Spinner />}
                </Center>
                {sessions.length !== 0 && sessionId !== 0 && (
                    <ConfirmInscription
                        showInscriptionModal={showInscriptionModal}
                        setShowInscriptionModal={setShowInscriptionModal}
                        session={sessions.find((session) => session.id === sessionId) || ""}
                        showEnrolled={showEnrolled}
                    />
                )}
            </ScrollView>

        </>
    );
}
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