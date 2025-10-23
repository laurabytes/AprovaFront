import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { colors, fonts, spacing } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { goals } from '../../data/mockData';

export default function GoalsScreen() {
  return (
    <View style={commonStyles.container}>
      <Header showBackButton showProgress currentStep={2} totalSteps={5} />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Minhas Metas</Text>
        <Text style={styles.subtitle}>Acompanhe seu progresso e conquiste seus objetivos.</Text>

        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>7</Text>
            <Text style={styles.summaryLabel}>Concluídos</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>4</Text>
            <Text style={styles.summaryLabel}>Em andamento</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Atrasados</Text>
          </Card>
        </View>

        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Card>
              <Text style={styles.goalTitle}>{item.title}</Text>
              <Text style={styles.goalSubtitle}>{item.subtitle}</Text>
              <View style={styles.progressContainer}>
                <ProgressBar progress={item.progress} />
                <Text style={styles.progressText}>{Math.round(item.progress * 100)}%</Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                  <Text style={styles.statusText}>
                    {item.status} {item.deadline}
                  </Text>
                </View>
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: fonts.smallSize,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  goalTitle: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  goalSubtitle: {
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
});