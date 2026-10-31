import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, TrendingDown, Wallet, ArrowRight, PiggyBank, ReceiptText } from 'lucide-react';
import { useTransactionStore } from '../stores/transactionStore';
import { formatCurrency, formatDate } from '../utils/formatters';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { TransactionForm, TransactionList } from '../components/transactions';
import { CategoryPieChart, ExpenseChart } from '../components/charts';

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const transactions = useTransactionStore((state) => state.transactions);
  const getSummary = useTransactionStore((state) => state.getSummary);
  const getRecentTransactions = useTransactionStore((state) => state.getRecentTransactions);
  const getCategoryChartData = useTransactionStore((state) => state.getCategoryChartData);
  const getMonthlyChartData = useTransactionStore((state) => state.getMonthlyChartData);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  const summary = getSummary();
  const recentTransactions = getRecentTransactions(5);
  const expenseChartData = getCategoryChartData('expense');
  const monthlyChartData = getMonthlyChartData();

  // Calculate savings rate
  const savingsRate = summary.totalIncome > 0
    ? Math.round(((summary.totalIncome - summary.totalExpense) / summary.totalIncome) * 100)
    : 0;

  const currentDateLabel = formatDate(new Date().toISOString(), 'EEEE, d MMMM yyyy');

  const stats = [
    {
      label: 'Total Balance',
      tag: summary.balance >= 0 ? 'Surplus' : 'Deficit',
      value: formatCurrency(summary.balance),
      icon: Wallet,
      color: summary.balance >= 0 ? 'text-primary-600 dark:text-primary-400' : 'text-danger-600 dark:text-danger-400',
      tagBg: summary.balance >= 0
        ? 'bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40'
        : 'bg-danger-50 text-danger-700 dark:bg-danger-950/60 dark:text-danger-300 border border-danger-200/50 dark:border-danger-800/40',
      iconBg: summary.balance >= 0 ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-danger-100 dark:bg-danger-900/30',
      cardGradient: summary.balance >= 0
        ? 'from-white via-white to-primary-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-primary-950/10'
        : 'from-white via-white to-danger-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-danger-950/10',
    },
    {
      label: 'Total Income',
      tag: 'Inflow',
      value: formatCurrency(summary.totalIncome),
      icon: TrendingUp,
      color: 'text-primary-600 dark:text-primary-400',
      tagBg: 'bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      cardGradient: 'from-white via-white to-primary-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-primary-950/10',
    },
    {
      label: 'Total Expense',
      tag: 'Outflow',
      value: formatCurrency(summary.totalExpense),
      icon: TrendingDown,
      color: 'text-danger-600 dark:text-danger-400',
      tagBg: 'bg-danger-50 text-danger-700 dark:bg-danger-950/60 dark:text-danger-300 border border-danger-200/50 dark:border-danger-800/40',
      iconBg: 'bg-danger-100 dark:bg-danger-900/30',
      cardGradient: 'from-white via-white to-danger-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-danger-950/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Dashboard
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Overview
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {currentDateLabel} • Real-time personal financial summary
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsFormOpen(true)}
            className="shadow-sm shadow-primary-500/20 hover:shadow-md transition-shadow"
          >
            New Transaction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={`bg-gradient-to-br ${stat.cardGradient} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider ${stat.tagBg}`}>
                {stat.tag}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Mini Insights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <PiggyBank className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Net Savings Rate</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {savingsRate >= 0 ? `${savingsRate}% of income saved` : 'Spending exceeds income'}
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
            savingsRate >= 20
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
              : savingsRate >= 0
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
          }`}>
            {savingsRate}%
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
              <ReceiptText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Activity</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {transactions.length} total entries recorded
              </p>
            </div>
          </div>
          <Link
            to="/transactions"
            className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 transition-colors"
          >
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader
            title="Monthly Trend"
            subtitle="Income vs expense comparison over time"
          />
          <ExpenseChart data={monthlyChartData} />
        </Card>

        {/* Category Distribution Chart */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader
            title="Expense Distribution"
            subtitle="Breakdown of your spending by category"
          />
          <CategoryPieChart data={expenseChartData} />
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader
          title="Recent Transactions"
          subtitle={`Showing latest ${Math.min(5, transactions.length)} of ${transactions.length} entries`}
          action={
            transactions.length > 5 ? (
              <Link to="/transactions">
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All
                </Button>
              </Link>
            ) : undefined
          }
        />
        <TransactionList
          transactions={recentTransactions}
          onDelete={deleteTransaction}
          emptyMessage="No transactions added yet"
        />
      </Card>

      {/* Transaction Form Modal */}
      <TransactionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
