import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { colors, fonts, spacing } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { performanceData, weeklyStudyData } from '../../data/mockData';

export default function HomeScreen() {

  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={commonStyles.container}>
      <Header title="Olá, Laura!" />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        {}
        <View onLayout={onLayout}>
          {}
          {containerWidth > 0 && (
            <>
              <Card>
                <Text style={styles.cardTitle}>Histórico de desempenho</Text>
                <PieChart
                  data={performanceData}
         
                  width={containerWidth - spacing.md * 2}
                  height={200}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor="hours"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </Card>

              <View style={styles.statsRow}>
                <Card style={styles.statCard}>
                  <Text style={styles.statNumber}>15H</Text>
                  <Text style={styles.statLabel}>Estudados essa semana</Text>
                </Card>
                <Card style={styles.statCard}>
                  <Text style={styles.statNumber}>4/7</Text>
                  <Text style={styles.statLabel}>Metas concluídas</Text>
                </Card>
              </View>

              <Card>
                <Text style={styles.cardTitle}>Horas de Estudo - Semana</Text>
                <BarChart
                  data={weeklyStudyData}
              
                  width={containerWidth - spacing.md * 2}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix="h"
                  chartConfig={{
                    backgroundColor: colors.white,
                    backgroundGradientFrom: colors.white,
                    backgroundGradientTo: colors.white,
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForBackgroundLines: {
                      strokeDasharray: '',
                      stroke: colors.gray,
                      strokeWidth: 0.5,
                    },
                  }}
                  style={styles.chart}
                  showValuesOnTopOfBars
                  fromZero
                />
              </Card>
            </>
          )}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: fonts.subtitleSize,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fonts.bodySize,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
});