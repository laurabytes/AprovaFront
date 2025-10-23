import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, fonts, spacing } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { scheduledSessions } from '../../data/mockData';

export default function SessionScreen() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <View style={commonStyles.container}>
      <Header showBackButton showProgress currentStep={1} totalSteps={5} />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Iniciar Sessão</Text>
        <Text style={styles.subtitle}>Concentre-se e maximize seu aprendizado.</Text>

        <Card>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Selecione a matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Escolha a matéria"
              placeholderTextColor={colors.secondaryText}
              value={selectedSubject}
              onChangeText={setSelectedSubject}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Escolha o tópico</Text>
            <TextInput
              style={styles.input}
              placeholder="Selecione o tópico"
              placeholderTextColor={colors.secondaryText}
              value={selectedTopic}
              onChangeText={setSelectedTopic}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
              <Text style={styles.label}>Data</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.secondaryText}
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: spacing.sm }]}>
              <Text style={styles.label}>Hora</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor={colors.secondaryText}
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>
        </Card>

        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>25:00</Text>
          </View>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Próxima Sessão agendada</Text>
          <View style={styles.sessionItem}>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionSubject}>{scheduledSessions[0].subject}</Text>
              <Text style={styles.sessionTime}>{scheduledSessions[0].time}</Text>
            </View>
            <TouchableOpacity style={styles.sessionButton}>
              <Text style={styles.sessionButtonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.titleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fonts.bodySize,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fonts.bodySize,
    color: colors.primaryText,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: spacing.sm,
    fontSize: fonts.bodySize,
    color: colors.primaryText,
  },
  row: {
    flexDirection: 'row',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  startButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 24,
  },
  startButtonText: {
    color: colors.white,
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionSubject: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  sessionTime: {
    fontSize: fonts.bodySize,
    color: colors.secondaryText,
  },
  sessionButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  sessionButtonText: {
    color: colors.white,
    fontSize: fonts.bodySize,
    fontWeight: '600',
  },
});