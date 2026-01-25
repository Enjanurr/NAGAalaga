import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/context/userContext";

export default function RootLayout(){
    return (
        <UserProvider>
            <StatusBar style="auto"/>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
        </UserProvider>
    )
}