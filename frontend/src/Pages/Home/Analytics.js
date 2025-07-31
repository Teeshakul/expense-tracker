import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Analytics = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const incomeTransactions = transactions.filter(t => t.transactionType === "credit");
  const expenseTransactions = transactions.filter(t => t.transactionType === "expense");

  const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalTurnOver = totalIncome + totalExpense;

  const incomePercent = (incomeTransactions.length / totalTransactions) * 100 || 0;
  const expensePercent = (expenseTransactions.length / totalTransactions) * 100 || 0;
  const incomeTurnOverPercent = (totalIncome / totalTurnOver) * 100 || 0;
  const expenseTurnOverPercent = (totalExpense / totalTurnOver) * 100 || 0;

  const categories = [
    "Groceries", "Rent", "Salary", "Tip", "Food",
    "Medical", "Utilities", "Entertainment", "Transportation", "Other"
  ];

  const colors = {
    Groceries: '#FF6384',
    Rent: '#36A2EB',
    Salary: '#FFCE56',
    Tip: '#4BC0C0',
    Food: '#9966FF',
    Medical: '#FF9F40',
    Utilities: '#8AC926',
    Entertainment: '#6A4C93',
    Transportation: '#1982C4',
    Other: '#F45B69'
  };

  const renderCategorySection = (type) =>
    categories.map(category => {
      const total = transactions
        .filter(t => t.transactionType === type && t.category === category)
        .reduce((acc, t) => acc + t.amount, 0);
      const percent = (total / totalTurnOver) * 100;

      return (
        total > 0 && (
          <LineProgressBar
            key={category + type}
            label={category}
            percentage={percent.toFixed(0)}
            lineColor={colors[category]}
          />
        )
      );
    });

  return (
    <Container className="mt-5 analytics-container">
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <div className="card h-100 shadow bg-dark text-white">
            <div className="card-header fw-bold">Total Transactions</div>
            <div className="card-body">
              <h5><ArrowDropUpIcon color="success" /> Income: {incomeTransactions.length}</h5>
              <h5><ArrowDropDownIcon color="error" /> Expense: {expenseTransactions.length}</h5>
              <div className="d-flex justify-content-around mt-3">
                <CircularProgressBar percentage={incomePercent.toFixed(0)} color="green" />
                <CircularProgressBar percentage={expensePercent.toFixed(0)} color="red" />
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <div className="card h-100 shadow bg-dark text-white">
            <div className="card-header fw-bold">Total Turnover</div>
            <div className="card-body">
              <h5>
                <ArrowDropUpIcon color="success" /> Income: {totalIncome} <CurrencyRupeeIcon />
              </h5>
              <h5>
                <ArrowDropDownIcon color="error" /> Expense: {totalExpense} <CurrencyRupeeIcon />
              </h5>
              <div className="d-flex justify-content-around mt-3">
                <CircularProgressBar percentage={incomeTurnOverPercent.toFixed(0)} color="green" />
                <CircularProgressBar percentage={expenseTurnOverPercent.toFixed(0)} color="red" />
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <div className="card h-100 shadow bg-dark text-white">
            <div className="card-header fw-bold">Categorywise Income</div>
            <div className="card-body">
              {renderCategorySection("credit")}
            </div>
          </div>
        </Col>

        <Col lg={3} md={6} className="mb-4">
          <div className="card h-100 shadow bg-dark text-white">
            <div className="card-header fw-bold">Categorywise Expense</div>
            <div className="card-body">
              {renderCategorySection("expense")}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
