import { render, screen } from '@testing-library/react';
import SignUp from '../components/signUp';
import history from '../components/history';
import { Router, Route, Switch } from "react-router-dom";

test('renders SignUp', () => {
  render(<Router history={history}>
        <Route exact path="/logIn" component={SignUp} />
      </Router>);
});