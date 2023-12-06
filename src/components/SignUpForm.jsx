import { ChevronDownIcon, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text } from "@gluestack-ui/themed";
import StyledInput from "./Input";

export default function SignUpForm({ user, setUser, invalidName, invalidEmail, invalidPhone, invalidEmergency, handleInputChange }) {
    return (
        <>
            <StyledInput
                id="name"
                label="Nombre completo"
                type="text"
                contentType="name"
                placeholder="Ingrese su nombre completo"
                autoComplete="name"
                required
                invalid={invalidName}
                value={user.name}
                onChange={handleInputChange}
            />
            <StyledInput
                id="email"
                label="Correo electrónico"
                type="text"
                contentType="emailAddress"
                placeholder="Ingrese su correo electrónico"
                autoComplete="email"
                required
                invalid={invalidEmail}
                value={user.email}
                onChange={handleInputChange}
            />
            <StyledInput
                id="phone"
                label="Teléfono"
                type="text"
                contentType="telephoneNumber"
                placeholder="Ingrese su número de teléfono"
                autoComplete="phone"
                required
                invalid={invalidPhone}
                value={user.phone}
                onChange={handleInputChange}
            />
            <StyledInput
                id="emergency_phone"
                label="Contacto de emergencia"
                type="text"
                contentType="telephoneNumber"
                placeholder="Ingrese su número de contacto de emergencia"
                autoComplete="emergency_phone"
                required
                invalid={invalidEmergency}
                value={user.emergency_phone}
                onChange={handleInputChange}
            />

            <Text color="#5d596c" fontSize={14} lineHeight={24} >
                Tipo de Sangre
            </Text>
            <Select
                id="blood_group_id"
                onValueChange={(e) => {
                    let blood_group_id = 0;
                    e === "O-" ? blood_group_id = 5 : 
                    e === "O+" ? blood_group_id = 7 :
                    e === "A-" ? blood_group_id = 2 :
                    e === "A+" ? blood_group_id = 6 :
                    e === "B-" ? blood_group_id = 8 :
                    e === "B+" ? blood_group_id = 3 :
                    e === "AB-" ? blood_group_id = 1 :
                    e === "AB+" ? blood_group_id = 4 : 
                    blood_group_id = 0;
                    setUser((prevCriteria) => ({
                        ...prevCriteria,
                        blood_group_id: blood_group_id,
                    }));
                }}
                my={"$2"}
            >
                <SelectTrigger variant="outline" size="md" >
                    <SelectInput placeholder="Seleccione su tipo de sangre" />
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

            <StyledInput
                id="password"
                label="Contraseña"
                type="password"
                contentType="password"
                placeholder="Ingrese la contraseña"
                autoComplete="emergency_phone"
                required
                invalid={invalidEmergency}
                value={user.password}
                onChange={handleInputChange}
            />
        </>
    );
}