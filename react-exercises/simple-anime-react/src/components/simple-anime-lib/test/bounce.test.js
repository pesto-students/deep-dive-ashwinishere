import React from 'react';
import renderer from 'react-test-renderer';
import { Bounce } from '../effects/bounce';

it('bounce effect snapshot test', () => {
  const tree = renderer.create(<Bounce></Bounce>).toJSON();
  expect(tree).toMatchSnapshot();
});
