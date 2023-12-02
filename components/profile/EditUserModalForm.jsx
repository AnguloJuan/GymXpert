import { Button, ButtonText, ChevronDownIcon, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, useToast } from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import StyledInput from "../Input";

const EditUserModalForm = (props) => {
    const {
        user,
        showEditModal,
        setShowEditModal,
        setUser,
    } = props;

    const [editUser, setEditUser] = useState({
        name: "",
        status: "Inactivo",
        phone: "",
        email: "",
        emergency: "",
        blood: "O-",
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
                        <StyledInput
                            id="name"
                            label="Nombre completo"
                            type="text"
                            contentType="name"
                            placeholder={editUser.name}
                            autoComplete="name"
                            color="#5d596c"
                            invalid={invalidName}
                            value={editUser.name}
                            onChange={handleInputChange}
                        />
                        <StyledInput
                            id="email"
                            label="Correo electrónico"
                            type="text"
                            contentType="emailAddress"
                            placeholder={editUser.email}
                            autoComplete="email"
                            color="#5d596c"
                            invalid={invalidEmail}
                            value={editUser.email}
                            onChange={handleInputChange}
                        />
                        <StyledInput
                            id="phone"
                            label="Telefono"
                            type="text"
                            contentType="telephoneNumber"
                            placeholder={editUser.phone}
                            autoComplete="phone"
                            color="#5d596c"
                            invalid={invalidPhone}
                            value={editUser.phone}
                            onChange={handleInputChange}
                        />
                        <StyledInput
                            id="emergency"
                            label="Contacto de emergencia"
                            type="text"
                            contentType="telephoneNumber"
                            placeholder={editUser.emergency}
                            autoComplete="emergency"
                            color="#5d596c"
                            invalid={invalidEmergency}
                            value={editUser.emergency}
                            onChange={handleInputChange}
                        />

                        <Text color="#5d596c" fontSize={14} lineHeight={24} >
                            Tipo de Sangre
                        </Text>
                        <Select
                            id="blood"
                            onValueChange={(e) => {
                                setEditUser((prevCriteria) => ({ ...prevCriteria, blood: e }));
                            }}
                            selectedValue={editUser.blood}
                            my={"$2"}
                        >
                            <SelectTrigger variant="outline" size="md" >
                                <SelectInput placeholder="Tipo de sangre" />
                                <SelectIcon mr="$3">
                                    <Icon as={ChevronDownIcon} />
                                </SelectIcon>
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectItem label="O-" value="O-" />
                                    <SelectItem label="O+" value="O+" />
                                    <SelectItem label="A-" value="A-" />
                                    <SelectItem label="A+" value="A+" />
                                    <SelectItem label="B-" value="B-" />
                                    <SelectItem label="B+" value="B+" />
                                    <SelectItem label="AB-" value="AB-" />
                                    <SelectItem label="AB+" value="AB+" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>

                        <Text color="#5d596c" fontSize={14} lineHeight={24} >
                            Status
                        </Text>
                        <Select
                            id="status"
                            onValueChange={(e) => {
                                setEditUser((prevCriteria) => ({ ...prevCriteria, status: e }));
                            }}
                            selectedValue={editUser.status}
                            my={"$2"}
                        >
                            <SelectTrigger variant="outline" size="md" >
                                <SelectInput placeholder="Status" />
                                <SelectIcon mr="$3">
                                    <Icon as={ChevronDownIcon} />
                                </SelectIcon>
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectItem label="Inactivo" value="Inactivo" />
                                    <SelectItem label="Activo" value="Activo" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>

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
                                    !invalidEmergency) {
                                    // API connecion and validation first here
                                    // ...
                                    // Then edit user
                                    setUser(editUser);
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