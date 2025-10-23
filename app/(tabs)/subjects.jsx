import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, fonts, spacing } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { subjects } from '../../data/mockData';

export default function SubjectsScreen() {
  const [subjectName, setSubjectName] = useState('');
  const [subjectColor, setSubjectColor] = useState('#FF0000');

  return (
    <View style={commonStyles.container}>
      <Header showBackButton showProgress currentStep={3} totalSteps={5} />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Minhas Matérias</Text>
        <Text style={styles.subtitle}>Gerencie suas disciplinas de estudo.</Text>

        <Card>
          <Text style={styles.cardTitle}>Adicionar Matéria</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da matéria"
              placeholderTextColor={colors.secondaryText}
              value={subjectName}
              onChangeText={setSubjectName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cor</Text>
            <View style={styles.colorInputContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="#FF0000"
                placeholderTextColor={colors.secondaryText}
                value={subjectColor}
                onChangeText={setSubjectColor}
              />
              <View
                style={[styles.colorPreview, { backgroundColor: subjectColor }]}
              />
            </View>
          </View>
        </Card>

        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Card style={[styles.subjectCard, { backgroundColor: item.color }]}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{item.name}</Text>
                <Text style={styles.subjectHours}>{item.hours}H estudadas</Text>
              </View>
              <View style={styles.subjectActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Pencil size={20} color={colors.primaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Trash2 size={20} color={colors.red} />
                </TouchableOpacity>
              </View>
            </Card>
          )}
        />

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
  cardTitle: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
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
  colorInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  subjectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  subjectHours: {
    fontSize: fonts.bodySize,
    color: colors.secondaryText,
  },
  subjectActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.xs,
  },
});