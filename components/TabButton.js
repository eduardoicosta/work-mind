import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TabButton({ titulo, ativo, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tabButton, ativo && styles.tabButtonAtivo]}
      onPress={onPress}
    >
      <Text
        style={[styles.tabButtonTexto, ativo && styles.tabButtonTextoAtivo]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2937',
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  tabButtonAtivo: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  tabButtonTexto: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextoAtivo: {
    color: '#0f172a',
    fontWeight: '700',
  },
});
