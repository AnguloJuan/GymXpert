import { Button, ButtonText, CloseIcon, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, useToast } from "@gluestack-ui/themed";
import { useContext, useRef } from "react";
import BASE_URL from "../../../Constants";
import { AuthContext } from "../../context/AuthContext";
import Toasts from "../Toasts";

const ConfirmInscription = (props) => {
    const {
        showInscriptionModal,
        setShowInscriptionModal,
        session
    } = props;

    const toast = useToast();
    const ref = useRef(null);
    const { user } = useContext(AuthContext);

    return (
        <Modal
            isOpen={showInscriptionModal}
            onClose={() => {
                setShowInscriptionModal(false);
            }}
            finalFocusRef={ref}
            size="md"
            scrollBehavior="inside"
            minWidth={"$full"}
        >
            <ModalBackdrop />
            <ModalContent bgColor="$white">
                <ModalHeader>
                    <Heading size="lg" color="#5d596c">Inscripción a la clase</Heading>
                    <ModalCloseButton
                        stroke={"#5d596c"}
                        bgColor="$red100"
                        $hover-bg="$red300"
                        $pressed={{
                            bgColor: "$red300",
                        }}
                    >
                        <CloseIcon />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody color="#5d596c" py={12}>
                    <Text>¿Estas seguro que deseas inscribirte a esta clase?</Text>
                    <Text fontWeight="$medium" textAlign="center">{session !== "" ? session.session.name : ""}</Text>
                </ModalBody>
                <ModalFooter pt={"$3"} pb={"$5"} >
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                            setShowInscriptionModal(false);
                        }}
                    >
                        <ButtonText color="#5d596c">Cancelar</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="primary"
                        borderWidth="$0"
                        onPress={() => {
                            // API call to register customer to session
                            BASE_URL.post(`/session-days/subscribe`, {
                                session_day_id: session.id,
                                customer_id: user.id,
                            })
                                .then((response) => {
                                    toast.show({
                                        placement: "bottom",
                                        render: ({ id }) => {
                                            return <Toasts
                                                id={id}
                                                title="Clase inscrita"
                                                body={<Text>{response.data.message}</Text>}
                                                variant="accent"
                                                action="success"
                                            />
                                        },
                                    })
                                    setShowInscriptionModal(false);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toast.show({
                                        placement: "bottom",
                                        render: ({ id }) => {
                                            return <Toasts
                                                id={id}
                                                title="Error"
                                                body={<Text>{error.response.data.message}</Text>}
                                                variant="accent"
                                                action="error"
                                            />
                                        },
                                    })
                                });
                        }}
                    >
                        <ButtonText>Inscribirse</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
};

export default ConfirmInscription;
