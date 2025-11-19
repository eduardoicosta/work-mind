# WorkMind - O Futuro do Trabalho

## 📝 Descrição do Projeto
O **WorkMind** é uma solução móvel desenvolvida para auxiliar profissionais e estudantes na adaptação ao futuro do trabalho. O aplicativo foca em três pilares essenciais: **Produtividade (Foco)**, **Bem-estar Mental** e **Aprendizado Contínuo (Gamificação)**. O objetivo é mitigar o burnout e aumentar a eficiência através de técnicas comprovadas como Pomodoro e respiração guiada.

## 🚀 Funcionalidades Principais (Requisito: Mínimo 3)
1.  **Gestão de Foco (Pomodoro & Respiração):**
    * Timer Pomodoro configurável para ciclos de foco profundo.
    * Exercício de respiração guiada (4-2-6) com animação visual e feedback tátil (vibração) para redução de ansiedade.
2.  **Monitoramento de Bem-estar:**
    * Diário de check-in emocional (Humor, Energia e Estresse).
    * Visualização de histórico local para autoanálise.
3.  **Gamificação e Missões:**
    * Sistema de missões diárias focadas em soft skills e hard skills.
    * Sistema de XP (pontos) e nivelamento do usuário (Iniciante -> Protagonista) baseado no engajamento.

## 🛠 Tecnologias Utilizadas
* **Frontend:** React Native (Expo)
* **Linguagem:** JavaScript (ES6+)
* **Armazenamento (Protótipo):** Gerenciamento de estado local (`useState`).
* **Banco de Dados (Modelagem):** Oracle Database (PL/SQL).
* **Design:** Estilização via `StyleSheet` com tema Dark Mode para conforto visual.

## ⚙️ Como rodar o projeto
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/eduardoicosta/work-mind.git](https://github.com/eduardoicosta/work-mind.git)
    ```
2.  **Instale as dependências:**
    ```bash
    cd work-mind
    npm install
    ```
3.  **Execute o projeto:**
    ```bash
    npx expo start
    ```
4.  Utilize o aplicativo **Expo Go** no seu celular ou um emulador Android/iOS para escanear o QR Code.

## 🗂 Estrutura de Arquivos
* `screens/AuthScreen.js`: Gerencia login e cadastro com validação de formulário.
* `screens/FocusScreen.js`: Implementa lógica de timers, animações (`Animated`) e vibração (`Vibration`).
* `screens/BemEstarScreen.js`: Coleta e lista dados de saúde mental.
* `screens/MissoesScreen.js`: Lógica de gamificação e cálculo de nível.
* `components/`: Componentes reutilizáveis de UI (Botões, Escalas).

---
**Desenvolvido por:** Arthur Dias da Silva Biancchi – RM 99162 / Enzo Puerta Meschini – RM 550807 / Eduardo Costa Nascimento dos Anjos – RM 552519
