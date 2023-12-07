import { Button, ButtonText, CloseIcon, Heading, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ScrollView, Text, useToast } from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import BASE_URL from "../../../Constants";
import Toasts from "../Toasts";
import EditUserForm from "./EditUserForm";

const EditUserModalForm = (props) => {
    const {
        user,
        showEditModal,
        setShowEditModal,
        setUser,
    } = props;

    const [editUser, setEditUser] = useState({
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
    });
    const toast = useToast();

    const ref = useRef(null);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidEmergency, setInvalidEmergency] = useState(false);
    useEffect(() => {
        setEditUser(user);
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Validations
        if (id === "name") {
            if (!value.match(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s']+$/i)) {
                setInvalidName(true);
            } else {
                setInvalidName(false);
            }
        }
        if (id === "email") {
            if (!value.match(
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            )) {
                setInvalidEmail(true);
            } else {
                setInvalidEmail(false);
            }
        }
        if (id === "phone") {
            if (!value.match(/^[0-9]+$/i)) {
                setInvalidPhone(true);
            } else {
                setInvalidPhone(false);
            }
        }
        if (id === "emergency") {
            if (!value.match(/^[0-9]+$/i)) {
                setInvalidEmergency(true);
            } else {
                setInvalidEmergency(false);
            }
        }

        setEditUser((prevCriteria) => ({ ...prevCriteria, [id]: value }));
    };

    return (
        <Modal
            isOpen={showEditModal}
            onClose={() => {
                setShowEditModal(false);
            }}
            finalFocusRef={ref}
            size="md"
            scrollBehavior="inside"
            minWidth={"$full"}
        >
            <ScrollView minWidth={"$full"} >

                <ModalBackdrop />
                <ModalContent bgColor="$white" alignSelf="center" mt={"$3"} mb={"$32"}>
                    <ModalHeader>
                        <Heading size="lg" color="#5d596c">Editar información</Heading>
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
                    <ModalBody color="#5d596c">

                        <EditUserForm
                            editUser={editUser}
                            setEditUser={setEditUser}
                            invalidName={invalidName}
                            invalidEmail={invalidEmail}
                            invalidPhone={invalidPhone}
                            invalidEmergency={invalidEmergency}
                            handleInputChange={handleInputChange}
                        />

                    </ModalBody>
                    <ModalFooter pt={"$3"} pb={"$5"} >
                        <Button
                            variant="outline"
                            size="sm"
                            action="secondary"
                            mr="$3"
                            onPress={() => {
                                setShowEditModal(false);
                            }}
                        >
                            <ButtonText color="#5d596c">Cancelar</ButtonText>
                        </Button>
                        <Button
                            size="sm"
                            action={(invalidName || invalidEmail || invalidPhone || invalidEmergency) ? "secondary" : "primary"}
                            borderWidth="$0"
                            disabled={invalidName || invalidEmail || invalidPhone || invalidEmergency}
                            onPress={() => {
                                if (
                                    user !== editUser &&
                                    !invalidName &&
                                    !invalidEmail &&
                                    !invalidPhone &&
                                    !invalidEmergency &&
                                    editUser.blood_group.name !== "") {
                                    // API connecion and validation first here
                                    const formData = new FormData();
                                    formData.append('name', editUser.name);
                                    formData.append('phone', editUser.phone);
                                    formData.append('emergency_phone', editUser.emergency_phone);
                                    formData.append('email', editUser.email);
                                    formData.append('blood_group_id', editUser.blood_group.id);
                                    formData.append('is_active', editUser.is_active);
                                    const headers = {
                                        headers: {
                                            'Accept': 'application/json',
                                        },
                                    }
                                    BASE_URL.patch(`/customers/${editUser.id}`, formData, headers)
                                        .then((res) => {
                                            if (res.data.status === "success") {
                                                toast.show({
                                                    placement: "bottom",
                                                    containerStyle: {
                                                        display: "block"
                                                    },
                                                    render: ({ id }) => {
                                                        return <Toasts
                                                            id={id}
                                                            title="Éxito"
                                                            body={<Text>{res.data.message}</Text>}
                                                            variant="accent"
                                                            action="success"
                                                        />
                                                    },
                                                })
                                                setUser(editUser);
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            toast.show({
                                                placement: "bottom",
                                                containerStyle: {
                                                    display: "block"
                                                },
                                                render: ({ id }) => {
                                                    return <Toasts
                                                        id={id}
                                                        title="Error"
                                                        body={<Text>{err.response.data.message}</Text>}
                                                        variant="accent"
                                                        action="error"
                                                    />
                                                },
                                            })
                                        });
                                    setShowEditModal(false);
                                }
                            }}
                        >
                            <ButtonText>Guardar</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ScrollView>
        </Modal>

    );
};

export default EditUserModalForm;
