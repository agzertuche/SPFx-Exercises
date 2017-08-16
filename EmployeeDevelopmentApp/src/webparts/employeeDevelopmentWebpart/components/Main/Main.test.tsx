/// <reference types="mocha" />

import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Main from './Main';
import { MockDataProvider } from '../../dataProviders';

describe('Main', () => {
  let props;
  let mountedMain;
  
  const main = () => {
    if(!mountedMain){
      mountedMain = mount(
        <Main {...props} />
      );
    }

    return mountedMain;
  };

  beforeEach(() => {
    props = {
      dataProvider: new MockDataProvider()
    };
    mountedMain = undefined;
  });

  it('Should exists', () => {
    expect(main).to.exist;
  });  

  it('Should render something', () => {
    const divs = main().find('div');
    expect(divs.length).to.be.greaterThan(0);
  });  
});