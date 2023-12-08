import { ChevronDownIcon, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text } from "@gluestack-ui/themed";
import StyledInput from "../Input";

export default function EditUserForm({ editUser, setEditUser, invalidName, invalidEmail, invalidPhone, invalidEmergency, handleInputChange }) {
    return (
        <>
            <StyledInput
                id="name"
                label="Nombre completo"
                type="text"
                contentType="name"
                placeholder={editUser.name}
                autoComplete="name"
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
                invalid={invalidEmail}
                value={editUser.email}
                onChange={handleInputChange}
            />
            <StyledInput
                id="phone"
                label="Teléfono"
                type="text"
                contentType="telephoneNumber"
                placeholder={editUser.phone}
                autoComplete="phone"
                invalid={invalidPhone}
                value={editUser.phone}
                onChange={handleInputChange}
            />
            <StyledInput
                id="emergency_phone"
                label="Contacto de emergencia"
                type="text"
                contentType="telephoneNumber"
                placeholder={editUser.emergency_phone}
                autoComplete="emergency_phone"
                invalid={invalidEmergency}
                value={editUser.emergency_phone}
                onChange={handleInputChange}
            />

            <Text color="#5d596c" fontSize={14} lineHeight={24} >
                Tipo de Sangre
            </Text>
            <Select
                id="blood_group"
                onValueChange={(e) => {
                    let blood_group = { id: 0, name: "" };
                    switch (e) {
                        case "O-":
                            blood_group = { id: 5, name: "O-" };
                            break;
                        case "O+":
                            blood_group = { id: 7, name: "O+" };
                            break;
                        case "A-":
                            blood_group = { id: 2, name: "A-" };
                            break;
                        case "A+":
                            blood_group = { id: 6, name: "A+" };
                            break;
                        case "B-":
                            blood_group = { id: 8, name: "B-" };
                            break;
                        case "B+":
                            blood_group = { id: 3, name: "B+" };
                            break;
                        case "AB-":
                            blood_group = { id: 1, name: "AB-" };
                            break;
                        case "AB+":
                            blood_group = { id: 4, name: "AB+" };
                            break;
                        default:
                            break;
                    }
                    setEditUser((prevCriteria) => ({
                        ...prevCriteria, blood_group: { ...blood_group }
                    }));
                }}
                selectedValue={editUser.blood_group.name}
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
                    e === "Activo" ? e = 1 : e = 0;
                    setEditUser((prevCriteria) => ({ ...prevCriteria, is_active: e }));
                }}
                selectedValue={editUser.is_active ? "Activo" : "Inactivo"}
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
        </>
    );
}