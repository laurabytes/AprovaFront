import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, fonts, spacing } from '../theme/colors';
import { commonStyles } from '../theme/styles';
import { scheduledSessions } from '../data/mockData';

export default function SubjectDetailScreen() {
  return (
    <View style={commonStyles.container}>
      <Header showBackButton showProgress currentStep={4} totalSteps={5} />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Português</Text>
        <Text style={styles.subtitle}>Alta prioridade</Text>

        <Card>
          <Text style={styles.cardTitle}>Exercícios Revisão</Text>
          <Text style={styles.cardSubtitle}>Meta Semanal de Estudos</Text>
          <View style={styles.progressContainer}>
            <ProgressBar progress={0.75} />
            <Text style={styles.progressText}>75%</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: colors.red }]}>
              <Text style={styles.statusText}>Alta Domingo</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Sessão Agendada</Text>
          <View style={styles.sessionItem}>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTopic}>{scheduledSessions[1].topic}</Text>
              <Text style={styles.sessionTime}>{scheduledSessions[1].time}</Text>
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
  cardTitle: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: fonts.bodySize,
    color: colors.secondaryText,
    marginBottom: spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: fonts.bodySize,
    color: colors.primaryText,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: fonts.smallSize,
    color: colors.white,
    fontWeight: '600',
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTopic: {
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
