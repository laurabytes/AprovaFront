import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Picker } from '@react-native-picker/picker';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, fonts, spacing } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { SubjectsContext } from '../../context/SubjectsContext';

const POMODORO_TIME = 25 * 60;

export default function SessionScreen() {
  const { subjects } = useContext(SubjectsContext); // Pega a lista de matérias do contexto

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [timeRemaining, setTimeRemaining] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    if (timeRemaining <= 0) {
      setIsActive(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Sessão Finalizada!", "Bom trabalho! Faça uma pausa.");
      setTimeRemaining(POMODORO_TIME);
      return;
    }
    const timerId = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    return () => clearTimeout(timerId);
  }, [isActive, timeRemaining]);

  const handleStartPause = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setIsActive(!isActive); };
  const handleReset = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setIsActive(false); setTimeRemaining(POMODORO_TIME); };
  const formatTime = (seconds) => { const minutes = Math.floor(seconds / 60); const secs = seconds % 60; return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; };

  return (
    <View style={commonStyles.container}>
      <Header showBackButton showProgress currentStep={1} totalSteps={5} />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Iniciar Sessão</Text>
        <Text style={styles.subtitle}>Concentre-se e maximize seu aprendizado.</Text>

        <Card>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Selecione a matéria</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSubject}
                onValueChange={(itemValue) => setSelectedSubject(itemValue)}
                style={Platform.OS === 'web' ? { outline: 'none' } : {}}
              >
                <Picker.Item label="Escolha uma matéria..." value={null} style={{ color: colors.secondaryText }} />
                {subjects.map((subject) => (
                  <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}><Text style={styles.label}>Escolha o tópico</Text><TextInput style={styles.input} placeholder="Selecione o tópico" placeholderTextColor={colors.secondaryText} value={selectedTopic} onChangeText={setSelectedTopic}/></View>
          <View style={styles.row}><View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}><Text style={styles.label}>Data</Text><TextInput style={styles.input} placeholder="DD/MM/AAAA" placeholderTextColor={colors.secondaryText} value={date} onChangeText={setDate}/></View><View style={[styles.inputGroup, { flex: 1, marginLeft: spacing.sm }]}><Text style={styles.label}>Hora</Text><TextInput style={styles.input} placeholder="HH:MM" placeholderTextColor={colors.secondaryText} value={time} onChangeText={setTime}/></View></View>
        </Card>

        <View style={styles.timerContainer}><View style={styles.timerCircle}><Text style={styles.timerText}>{formatTime(timeRemaining)}</Text></View><View style={styles.buttonRow}><TouchableOpacity style={styles.controlButton} onPress={handleReset}><Text style={styles.controlButtonText}>Reiniciar</Text></TouchableOpacity><TouchableOpacity style={styles.startButton} onPress={handleStartPause}><Text style={styles.startButtonText}>{isActive ? 'Pausar' : 'Iniciar'}</Text></TouchableOpacity></View></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: { borderWidth: 1, borderColor: colors.gray, borderRadius: 8, justifyContent: 'center', height: 42, overflow: 'hidden', backgroundColor: colors.white },
  title: { fontSize: fonts.titleSize, fontWeight: '600', color: colors.primaryText, marginBottom: spacing.xs, },
  subtitle: { fontSize: fonts.bodySize, color: colors.secondaryText, marginBottom: spacing.md, },
  inputGroup: { marginBottom: spacing.md, },
  label: { fontSize: fonts.bodySize, color: colors.primaryText, marginBottom: spacing.xs, fontWeight: '500', },
  input: { borderWidth: 1, borderColor: colors.gray, borderRadius: 8, padding: spacing.sm, fontSize: fonts.bodySize, color: colors.primaryText, height: 42, },
  row: { flexDirection: 'row', },
  timerContainer: { alignItems: 'center', marginVertical: spacing.lg, },
  timerCircle: { width: 200, height: 200, borderRadius: 100, borderWidth: 8, borderColor: colors.accent, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md, },
  timerText: { fontSize: 48, fontWeight: 'bold', color: colors.primaryText, fontFamily: 'monospace' },
  buttonRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  startButton: { backgroundColor: colors.accent, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, borderRadius: 24, },
  startButtonText: { color: colors.white, fontSize: fonts.subtitleSize, fontWeight: '600', },
  controlButton: { backgroundColor: colors.lightGray, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 24, borderWidth: 1, borderColor: colors.gray },
  controlButtonText: { color: colors.secondaryText, fontSize: fonts.subtitleSize, fontWeight: '500' },
});