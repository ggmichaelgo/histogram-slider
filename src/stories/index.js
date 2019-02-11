import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import HistogramSlider from '../components/HistogramSlider';

const histogramSliderStory = storiesOf('HistogramSlider', module);

histogramSliderStory.add('Default', () =>
  <div style={{padding: 50}}>
    <HistogramSlider
      tally={[
        1: 20,
        2: 10,
        3: 1,
        4: 2,
        5: 3,
        6: 20,
        7: 20,
        8: 50,
        9: 25,
        10: 49,
        11: 44,
        12: 55,
        13: 12,
        14: 42,
        15: 10,
        16: 5,
        17: 2,
        18: 25,
        19: 2
      ]}
      defaultHandlePosition={[10, 50]}
      onChange={(handlePosition) => {
        console.log('new handle positions', handlePosition);
      }}
    />
  </div>
)

histogramSliderStory.add('Tall', () =>
  <div style={{padding: 50}}>
    <HistogramSlider
      className="tall"
      tally={[
        1: 20,
        2: 10,
        3: 1,
        4: 2,
        5: 3,
        6: 20,
        7: 20,
        8: 50,
        9: 25,
        10: 49,
        11: 44,
        12: 55,
        13: 12,
        14: 42,
        15: 10,
        16: 5,
        17: 2,
        18: 25,
        19: 2
      ]}
      defaultHandlePosition={[10, 50]}
      onChange={(handlePosition) => {
        console.log('new handle positions', handlePosition);
      }}
    />
  </div>
)
