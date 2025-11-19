import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Vibration,
} from 'react-native';

function formatarTempo(segundos) {
  const m = Math.floor(segundos / 60)
    .toString()
    .padStart(2, '0');
  const s = (segundos % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function FocusScreen() {
  // ---------- ESTADO DO POMODORO ----------
  const [duracaoMinutos] = useState(25); // fixo pra simplicidade (25 min)
  const [segundosRestantes, setSegundosRestantes] = useState(25 * 60);
  const [rodando, setRodando] = useState(false);
  const [ciclosConcluidos, setCiclosConcluidos] = useState(0);
  const [pontosFoco, setPontosFoco] = useState(0);
  const [historicoPomodoro, setHistoricoPomodoro] = useState([]);

  // ---------- TIMER DO POMODORO ----------
  useEffect(() => {
    let intervalo = null;

    if (rodando) {
      intervalo = setInterval(() => {
        setSegundosRestantes((prev) => {
          if (prev <= 1) {
            clearInterval(intervalo);
            handleFimCiclo();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [rodando]);

  const handleFimCiclo = () => {
    setRodando(false);
    setCiclosConcluidos((prev) => prev + 1);
    setPontosFoco((prev) => prev + 10); // bônus de XP por ciclo

    const novoRegistro = {
      id: Date.now().toString(),
      data: new Date().toLocaleString(),
      duracao: duracaoMinutos,
    };

    setHistoricoPomodoro((prev) => [novoRegistro, ...prev]);

    // Vibração indicando fim do ciclo
    Vibration.vibrate(1000);
  };

  const iniciarPomodoro = () => {
    if (segundosRestantes === 0) {
      setSegundosRestantes(duracaoMinutos * 60);
    }
    setRodando(true);
  };

  const pausarPomodoro = () => {
    setRodando(false);
  };

  const resetarPomodoro = () => {
    setRodando(false);
    setSegundosRestantes(duracaoMinutos * 60);
  };

  // ---------- ANIMAÇÃO DA RESPIRAÇÃO ----------
  const [respirando, setRespirando] = useState(false);
  const escalaAnimada = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!respirando) {
      escalaAnimada.stopAnimation();
      escalaAnimada.setValue(1);
      return;
    }

    // 4s inspira (cresce), 2s segura, 6s expira (diminui) → loop
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(escalaAnimada, {
          toValue: 1.4,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(escalaAnimada, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    );

    animacao.start();

    // vibração leve repetida enquanto respira
    Vibration.vibrate([0, 300, 1700], true); // vibra 0.3s a cada 2s

    return () => {
      animacao.stop();
      Vibration.cancel();
    };
  }, [respirando, escalaAnimada]);

  const alternarRespiracao = () => {
    setRespirando((prev) => !prev);
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Foco e Respiração</Text>
      <Text style={styles.sectionSubtitle}>
        Use o timer Pomodoro para ciclos de foco profundo e a respiração 4-2-6
        para reduzir o estresse.
      </Text>

      {/* CARD POMODORO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Timer Pomodoro</Text>
        <Text style={styles.cardSubtitle}>
          Ciclos de {duracaoMinutos} minutos de foco.
        </Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerTexto}>
            {formatarTempo(segundosRestantes)}
          </Text>
        </View>

        <View style={styles.botoesLinha}>
          {!rodando ? (
            <TouchableOpacity
              style={[styles.botaoPrimario, { flex: 1, marginRight: 8 }]}
              onPress={iniciarPomodoro}
            >
              <Text style={styles.botaoPrimarioTexto}>
                {segundosRestantes === 0 ? 'Reiniciar ciclo' : 'Iniciar'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.botaoSecundario, { flex: 1, marginRight: 8 }]}
              onPress={pausarPomodoro}
            >
              <Text style={styles.botaoSecundarioTexto}>Pausar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.botaoSecundario, { flex: 1 }]}
            onPress={resetarPomodoro}
          >
            <Text style={styles.botaoSecundarioTexto}>Resetar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resumoLinha}>
          <Text style={styles.resumoTexto}>
            Ciclos concluídos: {ciclosConcluidos}
          </Text>
          <Text style={styles.resumoTexto}>Pontos de foco: {pontosFoco}</Text>
        </View>

        <Text style={styles.historicoTitulo}>Histórico de ciclos</Text>
        {historicoPomodoro.length === 0 ? (
          <Text style={styles.textoVazio}>
            Nenhum ciclo concluído ainda. Comece iniciando o primeiro Pomodoro. 💡
          </Text>
        ) : (
          <FlatList
            data={historicoPomodoro}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 8, maxHeight: 120 }}
            renderItem={({ item }) => (
              <View style={styles.itemHistorico}>
                <Text style={styles.itemHistoricoData}>{item.data}</Text>
                <Text style={styles.itemHistoricoTexto}>
                  Ciclo de {item.duracao} min concluído
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* CARD RESPIRAÇÃO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Respiração 4-2-6</Text>
        <Text style={styles.cardSubtitle}>
          Inspire por 4s, segure por 2s, solte por 6s. Repita o padrão.
        </Text>

        <View style={styles.respiracaoContainer}>
          <Animated.View
            style={[
              styles.bolinhaRespiracao,
              { transform: [{ scale: escalaAnimada }] },
            ]}
          />
        </View>

        <Text style={styles.textoRespiracao}>
          Use a bolinha como guia visual. Quando ela expandir, inspire. Quando
          ficar estável, segure. Quando encolher, expire lentamente.
        </Text>

        <TouchableOpacity
          style={[
            respirando ? styles.botaoSecundario : styles.botaoPrimario,
            { marginTop: 10 },
          ]}
          onPress={alternarRespiracao}
        >
          <Text
            style={
              respirando ? styles.botaoSecundarioTexto : styles.botaoPrimarioTexto
            }
          >
            {respirando ? 'Parar respiração guiada' : 'Iniciar respiração guiada'}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 10,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  timerTexto: {
    color: '#e5e7eb',
    fontSize: 32,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },
  botoesLinha: {
    flexDirection: 'row',
    marginTop: 8,
  },
  botaoPrimario: {
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
  botaoSecundario: {
    backgroundColor: '#020617',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  botaoSecundarioTexto: {
    color: '#e5e7eb',
    fontWeight: '600',
    fontSize: 14,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  resumoTexto: {
    color: '#9ca3af',
    fontSize: 12,
  },
  historicoTitulo: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 10,
  },
  textoVazio: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  itemHistorico: {
    paddingVertical: 6,
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
  },
  respiracaoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  bolinhaRespiracao: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#38bdf8',
    opacity: 0.9,
  },
  textoRespiracao: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
});
