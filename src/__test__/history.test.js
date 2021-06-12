import { render, screen } from '@testing-library/react';
import history from '../components/history';
import { Router, Route, Switch } from "react-router-dom";

test('renders History', () => {
  render(<Router history={history}>q
  </Router>);
});