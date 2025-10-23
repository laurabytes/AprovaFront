import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../theme/colors';

export function ProgressBar({ progress, color, height }) {
  // Garante que o progresso fique entre 0 e 100
  const progressPercent = `${Math.min(100, Math.max(0, progress * 100))}%`;

  return (
    <View style={[styles.container, { height }]}>
      <View
        style={[
          styles.progress,
          {
            width: progressPercent,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

ProgressBar.propTypes = {
  /**
   * O progresso da barra, um número entre 0 (0%) e 1 (100%).
   */
  progress: PropTypes.number.isRequired,
  /**
   * A cor da barra de progresso.
   */
  color: PropTypes.string,
  /**
   * A altura total da barra.
   */
  height: PropTypes.number,
};

// Valores padrão para as props
ProgressBar.defaultProps = {
  color: colors.accent,
  height: 8,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.gray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});