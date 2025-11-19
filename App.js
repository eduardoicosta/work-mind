import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import TabButton from './components/TabButton';
import TrilhasScreen from './screens/TrilhasScreen';
import BemEstarScreen from './screens/BemEstarScreen';
import MissoesScreen from './screens/MissoesScreen';
import FocusScreen from './screens/FocusScreen';
import AuthScreen from './screens/AuthScreen';

export default function App() {
  // Lista de usuários cadastrados (somente em memória, para protótipo)
  const [usuarios, setUsuarios] = useState([]);
  // Usuário logado (null = não logado)
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Controle das abas principais
  const [abaAtiva, setAbaAtiva] = useState('trilhas'); 
  // trilhas | bemestar | missoes | foco

  const handleCadastro = (novoUsuario) => {
    setUsuarios((prev) => [...prev, novoUsuario]);
  };

  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setAbaAtiva('trilhas');
  };

  // Se não tem usuário logado, mostra tela de autenticação
  if (!usuarioLogado) {
    return (
      <SafeAreaView style={styles.container}>
        <AuthScreen
          usuarios={usuarios}
          onCadastrar={handleCadastro}
          onLogin={handleLogin}
        />
      </SafeAreaView>
    );
  }

  // Usuário logado → mostra app principal
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appNome}>WorkMind</Text>
          <Text style={styles.appSubtitulo}>
            Bem-vindo, {usuarioLogado.nome || 'Usuário'}
          </Text>
        </View>

        <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
          <Text style={styles.botaoSairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Abas */}
      <View style={styles.tabsContainer}>
        <TabButton
          titulo="Trilhas"
          ativo={abaAtiva === 'trilhas'}
          onPress={() => setAbaAtiva('trilhas')}
        />
        <TabButton
          titulo="Bem-estar"
          ativo={abaAtiva === 'bemestar'}
          onPress={() => setAbaAtiva('bemestar')}
        />
        <TabButton
          titulo="Missões"
          ativo={abaAtiva === 'missoes'}
          onPress={() => setAbaAtiva('missoes')}
        />
        <TabButton
          titulo="Foco"
          ativo={abaAtiva === 'foco'}
          onPress={() => setAbaAtiva('foco')}
        />
      </View>

      {/* Conteúdo da aba selecionada */}
      <View style={{ flex: 1 }}>
        {abaAtiva === 'trilhas' && <TrilhasScreen />}
        {abaAtiva === 'bemestar' && <BemEstarScreen />}
        {abaAtiva === 'missoes' && <MissoesScreen />}
        {abaAtiva === 'foco' && <FocusScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appNome: {
    color: '#e5e7eb',
    fontSize: 24,
    fontWeight: '700',
  },
  appSubtitulo: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  botaoSair: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#020617',
  },
  botaoSairTexto: {
    color: '#f97373',
    fontSize: 12,
    fontWeight: '600',
  },
});
