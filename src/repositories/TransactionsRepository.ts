import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    /* eslint-disable no-param-reassign */
    const { income, outcome } = this.transactions.reduce(
      (balanceAccumulator: Balance, currentTransaction: Transaction) => {
        if (currentTransaction.type === 'income')
          balanceAccumulator.income += currentTransaction.value;
        else balanceAccumulator.outcome += currentTransaction.value;

        return balanceAccumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    /* eslint-enable no-param-reassign */

    const balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
