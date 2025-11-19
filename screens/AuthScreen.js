import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function AuthScreen({ usuarios, onCadastrar, onLogin }) {
  const [modo, setModo] = useState('login'); // 'login' | 'cadastro'

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  };

  const handleCadastro = () => {
    setMensagem('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    if (senha.length < 4) {
      setMensagem('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    const emailJaExiste = usuarios.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailJaExiste) {
      setMensagem('Já existe um usuário cadastrado com este e-mail.');
      return;
    }

    const novoUsuario = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
    };

    onCadastrar(novoUsuario);
    onLogin(novoUsuario); // já entra logado
    limparCampos();
  };

  const handleLogin = () => {
    setMensagem('');

    if (!email || !senha) {
      setMensagem('Informe e-mail e senha.');
      return;
    }

    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );

    if (!usuarioEncontrado) {
      setMensagem('E-mail ou senha inválidos.');
      return;
    }

    onLogin(usuarioEncontrado);
    limparCampos();
  };

  const alternarModo = () => {
    setMensagem('');
    setModo((prev) => (prev === 'login' ? 'cadastro' : 'login'));
    limparCampos();
  };

  const isLogin = modo === 'login';

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.appTitulo}>WorkMind</Text>
      <Text style={styles.appSubtitulo}>
        Construa seu futuro do trabalho com mais foco e bem-estar.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          {isLogin ? 'Entrar' : 'Criar conta'}
        </Text>
        <Text style={styles.cardDescricao}>
          {isLogin
            ? 'Acesse sua conta para acompanhar suas trilhas, missões e bem-estar.'
            : 'Cadastre-se para começar a acompanhar seu desenvolvimento.'}
        </Text>

        {!isLogin && (
          <>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#6b7280"
              value={nome}
              onChangeText={setNome}
            />
          </>
        )}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="voce@exemplo.com"
          placeholderTextColor="#6b7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {!isLogin && (
          <>
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Repita a senha"
              placeholderTextColor="#6b7280"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </>
        )}

        {mensagem ? (
          <Text style={styles.mensagem}>{mensagem}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.botaoPrimario}
          onPress={isLogin ? handleLogin : handleCadastro}
        >
          <Text style={styles.botaoPrimarioTexto}>
            {isLogin ? 'Entrar' : 'Cadastrar e entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={alternarModo} style={{ marginTop: 10 }}>
          <Text style={styles.botaoAlternarTexto}>
            {isLogin
              ? 'Não tem conta? Criar uma conta'
              : 'Já tem conta? Entrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dicaContainer}>
        <Text style={styles.dicaTitulo}>Como funciona o acesso?</Text>
        <Text style={styles.dicaTexto}>
          Este protótipo guarda seus dados apenas enquanto o app está aberto.
          Em uma versão de produção, os cadastros seriam salvos em um servidor
          seguro e integrados ao banco de dados Oracle/PLSQL da solução.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  appTitulo: {
    color: '#e5e7eb',
    fontSize: 28,
    fontWeight: '800',
  },
  appSubtitulo: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardTitulo: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescricao: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 12,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#020617',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#e5e7eb',
    fontSize: 14,
  },
  mensagem: {
    color: '#f97373',
    fontSize: 12,
    marginTop: 8,
  },
  botaoPrimario: {
    marginTop: 14,
    backgroundColor: '#38bdf8',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  botaoPrimarioTexto: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 14,
  },
  botaoAlternarTexto: {
    color: '#38bdf8',
    fontSize: 13,
    textAlign: 'center',
  },
  dicaContainer: {
    marginTop: 16,
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  dicaTitulo: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  dicaTexto: {
    color: '#9ca3af',
    fontSize: 12,
  },
});
