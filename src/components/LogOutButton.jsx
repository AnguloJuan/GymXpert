import { Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LogOutButton() {
    const { logOut } = useContext(AuthContext);
    return (
        <Button
            size="xs"
            variant="outline"
            isDisabled={false}
            mr={8}
            borderColor="$backgroundDark700"
            sx={{
                ":hover": { backgroundColor: "$light100" },
                ":focusVisible": { backgroundColor: "$light100" },
                ":active": { backgroundColor: "$light100" },
            }}
            onPress={() => logOut()}
        >
            <ButtonText>Salir </ButtonText>
            <ButtonIcon as={LogOut} />
        </Button>
    );
}