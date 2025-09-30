# 🧠 Sistema de Agendamento Psicológico

Um sistema web para **pacientes solicitarem atendimento psicológico** e **psicólogos gerenciarem agendamentos**, desenvolvido em **React + Vite** com design moderno e interativo.

---

## ✨ Funcionalidades

* 👤 **Autenticação de usuários** (login e cadastro)
* 📅 **Solicitação de agendamento** com escolha de psicólogo
* 📝 Campo de descrição para necessidades do paciente
* ⚡ Seleção do nível de **urgência** (baixa, média, alta)
* 🔔 Notificações com `react-hot-toast`
* 📊 Dashboard para psicólogos acompanharem seus pacientes e sessões
* 🎨 Estilização com **Tailwind CSS** e ícones `lucide-react`

---

## 🛠️ Tecnologias Utilizadas

* **React 18** + **Vite**
* **React Router** (navegação entre páginas)
* **Tailwind CSS** (estilização)
* **Lucide-react** (ícones)
* **React Hot Toast** (notificações)
* **Context API** para autenticação
* **Mock API** (simulação de backend)

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Cristian914/front-Lyra
cd seu-repo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto

```bash
npm run dev
```

O projeto ficará disponível em:
👉 [http://localhost:5173](http://localhost:5173)

---

## 📂 Estrutura de Pastas (simplificada)

```
src/
 ├── components/     # Componentes reutilizáveis
 ├── context/        # Contexto de autenticação
 ├── pages/          # Páginas principais (Login, Dashboard, Agendamento...)
 ├── services/       # Mock API e integrações
 ├── AppRoutes.jsx   # Definição das rotas
 └── main.jsx        # Entrada principal
```

---

## 💡 Melhorias Futuras

* Integração com API real (Node/Express ou Firebase)
* Agenda interativa para psicólogos
* Chat entre paciente e psicólogo
* Suporte a múltiplos idiomas

---

## Fontes
*  --color-dark: #00a8f0;       /* Azul principal */
*  --color-medium: #26B0BF;     /* Azul aqua */
*  --color-light: #2493BF;      /* Azul skye (fundo desejado) */
*  --color-accent: #26B0BF;     /* Cinza neutro para textos */
*  --color-background: #45527b; /* Fundo alternativo, não usado */
