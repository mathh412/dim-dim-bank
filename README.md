# 🏦 Dim Dim Bank

> Uma aplicação web de Internet Banking moderna, desenvolvida com arquitetura SPA (Single Page Application) e JavaScript Puro (Vanilla JS).

![Badge Concluído](https://img.shields.io/badge/Status-Concluído-green)
![Tech HTML5](https://img.shields.io/badge/Tech-HTML5-orange)
![Tech CSS3](https://img.shields.io/badge/Tech-CSS3-blue)
![Tech JS](https://img.shields.io/badge/Tech-JavaScript-yellow)

## 📖 Sobre o Projeto

O **Dim Dim Bank** é um simulador de banco digital focado na experiência do usuário e performance. O projeto foi construído como uma **Single Page Application (SPA)**, garantindo uma navegação fluida e instantânea sem recarregamentos de página.

O sistema simula as principais operações bancárias do dia a dia, gerenciando todo o estado da aplicação (saldo, transações, autenticação) diretamente no navegador do usuário.

## ⚙️ Destaques Técnicos

Este projeto foi desenvolvido para demonstrar domínio sobre os fundamentos do desenvolvimento web moderno, sem depender de frameworks pesados (como React ou Vue) para o funcionamento principal.

* **Arquitetura SPA "Handmade":** Sistema de rotas próprio que alterna entre as telas (Home, Pagamentos, Investimentos) instantaneamente manipulando o DOM.
* **Vanilla JS (ES6+):** Uso de JavaScript moderno e limpo, aplicando conceitos de Classes, Arrow Functions e Manipulação de Eventos.
* **Gerenciamento de Estado:** Uma classe dedicada (`User.js`) atua como um "banco de dados local", centralizando a lógica de saldo e extrato.
* **Design System:** CSS organizado com variáveis globais (`:root`) e layouts responsivos utilizando Flexbox e Grid.

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico**
* **CSS3** (Variáveis, Flexbox, Grid, Animações)
* **JavaScript (ES6+)**
* **LocalStorage** (Persistência de dados)
* **Bibliotecas Auxiliares:**
    * [Chart.js](https://www.chartjs.org/) (Visualização de dados financeiros)
    * [Cleave.js](https://nosir.github.io/cleave.js/) (Máscaras de Input para CPF e Moeda)
    * [FontAwesome](https://fontawesome.com/) (Ícones)

## ✨ Funcionalidades

* **Autenticação Segura:**
    * Cadastro de conta com validação real de algoritmo de CPF.
    * Login com verificação de credenciais.
* **Painel Principal (Dashboard):**
    * Visualização de saldo atualizado em tempo real.
    * Atalhos rápidos para as principais funções.
* **Transações:**
    * **Pagamentos:** Simulação de envios via PIX e Cartão de Crédito.
    * **Investimentos:** Simulador de aportes (CDB, Ações, Cripto) com gráfico de projeção de rendimento.
    * **Extrato:** Histórico completo de entradas e saídas.
* **Persistência:** Todos os dados ficam salvos no navegador, permitindo fechar a aba e retornar posteriormente com o saldo preservado.

## 📂 Estrutura do Projeto

```text
dim-dim-bank/
├── index.html        # Landing Page (Página Inicial)
├── login.html        # Tela de Login
├── cadastro.html     # Tela de Cadastro
├── dashboard.html    # Aplicação Principal (SPA)
├── css/
│   ├── global.css        # Estilos globais e variáveis
│   ├── logcad.css        # Estilos específicos de autenticação
│   └── dashboard-spa.css # Estilos do sistema bancário
└── script/
    ├── User.js       # Lógica de Dados (Model)
    ├── app.js        # Lógica da Aplicação (Controller)
    └── logcad.js     # Validações de Formulário
```
## 🏁 Como Rodar o Projeto

Como este é um projeto Front-end estático, não é necessária nenhuma instalação complexa de backend.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/mathh412/dim-dim-bank.git]
   ```
2. **Acesse a pasta:**
   ```bash 
   cd dim-dim-bank
   ```
3. **Abra o navegador:**
   * Basta dar um duplo clique no arquivo `index.html`.
   * *Dica:* Para uma melhor experiência, utilize a extensão **Live Server** no VS Code.

## 📝 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio. Sinta-se à vontade para usar o código como referência!

---
Desenvolvido com 💜 por **Matheus**
   
