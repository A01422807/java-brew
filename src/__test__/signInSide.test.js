import { render, screen } from '@testing-library/react';
import SignInSide from '../components/signInSide';
import history from '../components/history';
import { Router, Route, Switch } from "react-router-dom";

test('renders SignInSide', () => {
  render(<Router history={history}>
        <Route exact path="/logIn" component={SignInSide} />
      </Router>);
});