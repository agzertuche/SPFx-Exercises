/// <reference types="mocha" />

import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils'; 
import { assert, expect } from 'chai';
import { mount } from 'enzyme';
import Main from './Main';

declare const sinon;
 
describe('<Main />', () => {
  it('Should render something', () => {
    expect(0).to.be.greaterThan(0);
    assert.ok(true);
  });  
});