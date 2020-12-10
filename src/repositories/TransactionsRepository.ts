import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulator.income = acumulator.income + transaction.value;
            break;
          case 'outcome':
            acumulator.outcome = acumulator.outcome + transaction.value;
            break;
        }

        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value: Number(value), type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
