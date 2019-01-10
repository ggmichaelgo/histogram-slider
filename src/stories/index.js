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
      valueList={[
        1,1,1,1,2,2,3,3,3,4,5,6,7,8,8,8,8,8,8,
        11,11,11,12,12,13,13,13,14,15,16,17,18,18,18,18,18,18,
        21,21,21,22,22,23,23,23,24,25,26,27,28,28,28,28,28,28
      ]}
      defaultHandlePosition={[10, 50]}
      onChange={(handlePosition) => {
        console.log('new handle positions', handlePosition);
      }}
    />
  </div>
)
