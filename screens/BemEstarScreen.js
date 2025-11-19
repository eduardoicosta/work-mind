import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Escala from '../components/Escala';

export default function BemEstarScreen() {
  const [humorAtual, setHumorAtual] = useState(null);
  const [energiaAtual, setEnergiaAtual] = useState(null);
  const [estresseAtual, setEstresseAtual] = useState(null);
  const [historicoBemEstar, setHistoricoBemEstar] = useState([]);

  const registrarBemEstar = () => {
    if (
      humorAtual === null ||
      energiaAtual === null ||
      estresseAtual === null
    ) {
      Alert.alert('Atenção', 'Preencha humor, energia e estresse antes de registrar.');
      return;
    }

    const registro = {
      id: Date.now().toString(),
      humor: humorAtual,
      energia: energiaAtual,
      estresse: estresseAtual,
      data: new Date().toLocaleString(),
    };

    setHistoricoBemEstar([registro, ...historicoBemEstar]);
    setHumorAtual(null);
    setEnergiaAtual(null);
    setEstresseAtual(null);
    Alert.alert('Sucesso', 'Check-in de bem-estar registrado com sucesso!');
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Bem-estar no Trabalho</Text>
      <Text style={styles.sectionSubtitle}>
        Faça check-ins rápidos sobre como você está se sentindo hoje.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como você está se sentindo agora?</Text>

        <View style={styles.botoesLinha}>
          <Text style={styles.label}>Humor:</Text>
          <Escala valorAtual={humorAtual} onChange={setHumorAtual} />
        </View>

        <View style={styles.botoesLinha}>
          <Text style={styles.label}>Energia:</Text>
          <Escala valorAtual={energiaAtual} onChange={setEnergiaAtual} />
        </View>

        <View style={styles.botoesLinha}>
          <Text style={styles.label}>Estresse:</Text>
          <Escala valorAtual={estresseAtual} onChange={setEstresseAtual} />
        </View>

        <View style={styles.botaoPrimario} onTouchEnd={registrarBemEstar}>
          <Text style={styles.botaoPrimarioTexto}>Registrar check-in</Text>
        </View>
      </View>

      <Text style={styles.sectionSubtitle}>Histórico recente</Text>

      {historicoBemEstar.length === 0 ? (
        <Text style={styles.textoVazio}>
          Nenhum check-in registrado ainda. Comece registrando o primeiro!
        </Text>
      ) : (
        <FlatList
          data={historicoBemEstar}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={styles.itemHistorico}>
              <Text style={styles.itemHistoricoData}>{item.data}</Text>
              <Text style={styles.itemHistoricoTexto}>
                Humor: {item.humor} | Energia: {item.energia} | Estresse:{' '}
                {item.estresse}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: '#e5e7eb',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 10,
  },
  botoesLinha: {
    marginBottom: 10,
  },
  label: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 4,
  },
  botaoPrimario: {
    marginTop: 10,
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  botaoPrimarioTexto: {
    color: '#022c22',
    fontWeight: '700',
    fontSize: 14,
  },
  textoVazio: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 8,
  },
  itemHistorico: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
  },
  itemHistoricoData: {
    color: '#9ca3af',
    fontSize: 11,
  },
  itemHistoricoTexto: {
    color: '#e5e7eb',
    fontSize: 13,
    marginTop: 2,
  },
});
