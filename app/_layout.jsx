import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* A tela principal é o conjunto de abas, sem cabeçalho próprio */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* As outras telas abrem como páginas normais, também sem cabeçalho duplicado */}
      <Stack.Screen name="subject" options={{ headerShown: false }} />
    </Stack>
  );
}