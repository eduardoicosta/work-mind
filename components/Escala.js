import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Escala({ min = 1, max = 5, valorAtual, onChange }) {
  const botoes = [];
  for (let i = min; i <= max; i++) {
    botoes.push(
      <TouchableOpacity
        key={i}
        style={[
          styles.escalaBotao,
          valorAtual === i && styles.escalaBotaoAtivo,
        ]}
        onPress={() => onChange(i)}
      >
        <Text
          style={[
            styles.escalaBotaoTexto,
            valorAtual === i && styles.escalaBotaoTextoAtivo,
          ]}
        >
          {i}
        </Text>
      </TouchableOpacity>
    );
  }

  return <View style={styles.escalaContainer}>{botoes}</View>;
}

const styles = StyleSheet.create({
  escalaContainer: {
    flexDirection: 'row',
  },
  escalaBotao: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginRight: 6,
    backgroundColor: '#020617',
  },
  escalaBotaoAtivo: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  escalaBotaoTexto: {
    color: '#9ca3af',
    fontSize: 13,
  },
  escalaBotaoTextoAtivo: {
    color: '#0f172a',
    fontWeight: '700',
  },
});
