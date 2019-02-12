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
      tally={{
        1: 20,
        2: 10,
        3: 1,
        4: 2,
        5: 3,
        6: 20,
        150: 100
      }}
      interval={5}
      defaultHandlePosition={[10, 50]}
    />
  </div>
)

histogramSliderStory.add('Tall', () =>
  <div style={{padding: 50}}>
    <HistogramSlider
      className="tall"
      tally={{
        1: 20,
        2: 10,
        3: 1,
        4: 2,
        5: 3,
        6: 20,
        100: 100
      }}
      defaultHandlePosition={[10, 50]}
    />
  </div>
)
