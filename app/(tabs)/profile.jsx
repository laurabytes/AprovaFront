import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Header } from '../../components/Header'; // O caminho da importação mudou
import { useUser } from '../../hooks/useUser';   // O caminho da importação mudou
import { commonStyles } from '../../theme/styles'; // O caminho da importação mudou
import { colors, fonts, spacing } from '../../theme/colors'; // O caminho da importação mudou

export default function ProfileScreen() {
  const user = useUser();

  return (
    <View style={commonStyles.container}>
      {/* O Header agora é chamado diretamente */}
      <Header title="Meu Perfil" />

      <View style={styles.content}>
        <Image
          source={{ uri: user.profileImageUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.placeholder}>Configurações e mais detalhes aqui...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fonts.titleSize,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  placeholder: {
    fontSize: fonts.bodySize,
    color: colors.secondaryText,
  },
});