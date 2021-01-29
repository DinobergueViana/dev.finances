const Modal = {
  open(){
    // abrir modal
    // adicionar a class active ao modal
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close(){
    // fechar modal
    // remover a class active do modal
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}

const Transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50001,
      date: '23/01/2021'
    },
    {
      description: 'Website',
      amount: 500000,
      date: '23/01/2021'
    },
    {
      description: 'Internet',
      amount: -20012,
      date: '23/01/2021'
    }
  ],
  //adiciona nova transação
  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },
  // remove transação
  remove(index){
    Transaction.all.splice(index, 1);
    App.reload()
  },
  // soma entradas
  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0) {
        income += transaction.amount;
      }
    })

    return income;
  },
  // soma saídas
  expenses() {
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0) {
        expense += transaction.amount;
      }
    })

    return expense;
  },
  // soma entradas + saídas
  total() {
    return Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income': 'expense';
    const amount = Utils.formartCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}"> ${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
  },
  updateBalance() {
    document
    .getElementById('incomeDisplay').innerHTML = Utils.formartCurrency(Transaction.incomes())
    document
    .getElementById('expenseDisplay').innerHTML = Utils.formartCurrency(Transaction.expenses())
    document
    .getElementById('totalDisplay').innerHTML = Utils.formartCurrency(Transaction.total())
  },
  clearTransactions(){
    DOM.transactionsContainer.innerHTML = "";
  }
}

const Utils = {
  formartCurrency(value){
    // definindo sinal negativo
    const signal = Number(value) < 0 ? "-" : "";

    // formatando o valor para uma string removendo o sinal de menos '-'
    value = String(value).replace(/\D/g, "")

    // convertendo a string para numero
    value = Number(value) / 100

    // converto o numero para moeda
    value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})

    return signal + value
  }
}

const Form = {
  submit(event){
    event.preventDefault()
  }
}

const App = {
  init(){

    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })

    DOM.updateBalance();
  },
  reload(){
    DOM.clearTransactions();
    App.init();
  }
}

App.init()
