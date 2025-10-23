import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Bell, ArrowLeft } from 'lucide-react-native';
import { colors, fonts, spacing } from '../theme/colors';

export function Header({
  title,
  showBackButton,
  showNotification,
  showProgress,
  currentStep,
  totalSteps,
  onBackPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primaryText} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {showProgress && (
        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      )}

      <View style={styles.rightSection}>
        {showNotification && (
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={colors.primaryText} />
          </TouchableOpacity>
        )}
        <View style={styles.avatar}>
          <View style={styles.avatarPlaceholder} />
        </View>
      </View>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  showNotification: PropTypes.bool,
  showProgress: PropTypes.bool,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  onBackPress: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  showBackButton: false,
  showNotification: true,
  showProgress: false,
  currentStep: 1,
  totalSteps: 5,
  onBackPress: () => {}, 
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: fonts.titleSize,
    fontWeight: '600',
    color: colors.primaryText,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -25 }], 
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray,
    marginHorizontal: 3,
  },
  progressDotActive: {
    backgroundColor: colors.accent,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.accent,
  },
});