import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PERFIS = [
  {
    id: '1',
    nome: 'Iniciante em Tecnologia',
    descricao: 'Quer começar na área de tecnologia, sem experiência.',
    trilhas: [
      'Lógica de programação básica',
      'Introdução a desenvolvimento mobile',
      'Noções de banco de dados',
    ],
  },
  {
    id: '2',
    nome: 'Profissional em Transição',
    descricao: 'Já trabalha, mas quer mudar de área.',
    trilhas: [
      'Análise de dados para iniciantes',
      'Fundamentos de IA no trabalho',
      'Produtividade e trabalho remoto',
    ],
  },
  {
    id: '3',
    nome: 'Estudante',
    descricao: 'Está estudando e quer se preparar para o mercado.',
    trilhas: [
      'Organização de estudos',
      'Projetos práticos em equipe',
      'Portfólio e LinkedIn profissional',
    ],
  },
];

export default function TrilhasScreen() {
  const [perfilSelecionado, setPerfilSelecionado] = useState(PERFIS[0]);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Trilhas de Aprendizagem</Text>
      <Text style={styles.sectionSubtitle}>
        Escolha um perfil e veja trilhas recomendadas para o futuro do trabalho.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 10 }}
      >
        {PERFIS.map((perfil) => (
          <View
            key={perfil.id}
            style={[
              styles.perfilCard,
              perfilSelecionado.id === perfil.id && styles.perfilCardAtivo,
            ]}
            onTouchEnd={() => setPerfilSelecionado(perfil)}
          >
            <Text style={styles.perfilTitulo}>{perfil.nome}</Text>
            <Text style={styles.perfilDescricao}>{perfil.descricao}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.trilhaContainer}>
        <Text style={styles.trilhaTitulo}>
          Trilhas recomendadas para: {perfilSelecionado.nome}
        </Text>
        {perfilSelecionado.trilhas.map((t, index) => (
          <View key={index} style={styles.trilhaItem}>
            <View style={styles.trilhaMarcador} />
            <Text style={styles.trilhaTexto}>{t}</Text>
          </View>
        ))}
      </View>
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
  perfilCard: {
    width: 220,
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  perfilCardAtivo: {
    borderColor: '#38bdf8',
    backgroundColor: '#0b1120',
  },
  perfilTitulo: {
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
  },
  perfilDescricao: {
    color: '#9ca3af',
    fontSize: 12,
  },
  trilhaContainer: {
    marginTop: 14,
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  trilhaTitulo: {
    color: '#e5e7eb',
    fontWeight: '600',
    marginBottom: 8,
  },
  trilhaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trilhaMarcador: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38bdf8',
    marginRight: 8,
  },
  trilhaTexto: {
    color: '#cbd5f5',
    fontSize: 13,
  },
});
