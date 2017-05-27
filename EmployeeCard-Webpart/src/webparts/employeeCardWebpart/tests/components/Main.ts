/// <reference types="mocha" />

import { expect } from 'chai';
import Main from '../../components/Main';

describe('Main', () => {
  it('should render', () => {
    expect(Main).to.exist;
  });
});
