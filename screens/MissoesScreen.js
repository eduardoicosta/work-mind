import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MISSOES_INICIAIS = [
  {
    id: 'm1',
    titulo: 'Fazer 1 check-in de bem-estar hoje',
    descricao: 'Registre como você está se sentindo.',
    pontos: 10,
  },
  {
    id: 'm2',
    titulo: 'Ler 10 minutos sobre uma nova habilidade',
    descricao: 'Avance em alguma trilha de aprendizagem.',
    pontos: 15,
  },
  {
    id: 'm3',
    titulo: 'Planejar 1 objetivo da semana',
    descricao: 'Defina uma meta pequena, mas concreta.',
    pontos: 20,
  },
];

export default function MissoesScreen() {
  const [missoes, setMissoes] = useState(
    MISSOES_INICIAIS.map((m) => ({ ...m, concluida: false }))
  );
  const [pontosTotais, setPontosTotais] = useState(0);

  const concluirMissao = (id) => {
    const novasMissoes = missoes.map((m) => {
      if (m.id === id && !m.concluida) {
        setPontosTotais((prev) => prev + m.pontos);
        return { ...m, concluida: true };
      }
      return m;
    });
    setMissoes(novasMissoes);
  };

  const nivel =
    pontosTotais < 30
      ? 'Iniciante'
      : pontosTotais < 60
      ? 'Em evolução'
      : 'Protagonista do futuro';

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Missões e Gamificação</Text>
      <Text style={styles.sectionSubtitle}>
        Complete missões e acumule pontos de desenvolvimento.
      </Text>

      <View style={styles.cardResumo}>
        <Text style={styles.cardResumoTitulo}>Seu resumo</Text>
        <Text style={styles.cardResumoPontos}>{pontosTotais} pontos</Text>
        <Text style={styles.cardResumoNivel}>Nível: {nivel}</Text>
      </View>

      <FlatList
        data={missoes}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.missaoCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.missaoTitulo}>{item.titulo}</Text>
              <Text style={styles.missaoDescricao}>{item.descricao}</Text>
              <Text style={styles.missaoPontos}>{item.pontos} pontos</Text>
            </View>
            <View
              style={[
                styles.botaoMissao,
                item.concluida && styles.botaoMissaoConcluida,
              ]}
              onTouchEnd={() => {
                if (!item.concluida) concluirMissao(item.id);
              }}
            >
              <Text
                style={[
                  styles.botaoMissaoTexto,
                  item.concluida && styles.botaoMissaoTextoConcluida,
                ]}
              >
                {item.concluida ? 'Concluída' : 'Concluir'}
              </Text>
            </View>
          </View>
        )}
      />
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
  cardResumo: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardResumoTitulo: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  cardResumoPontos: {
    color: '#e5e7eb',
    fontSize: 22,
    fontWeight: '700',
  },
  cardResumoNivel: {
    color: '#38bdf8',
    fontSize: 13,
    marginTop: 4,
  },
  missaoCard: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginTop: 10,
  },
  missaoTitulo: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  missaoDescricao: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  missaoPontos: {
    color: '#22c55e',
    fontSize: 12,
    marginTop: 4,
  },
  botaoMissao: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  botaoMissaoConcluida: {
    borderColor: '#16a34a',
    backgroundColor: '#022c22',
  },
  botaoMissaoTexto: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
  },
  botaoMissaoTextoConcluida: {
    color: '#bbf7d0',
  },
});
