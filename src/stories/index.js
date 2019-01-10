import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import HistogramSlider from '../components/HistogramSlider';

const histogramSliderStory = storiesOf('HistogramSlider', module);

histogramSliderStory.add('Default', () =>
  <HistogramSlider
    valueList={[1,2,2,2,2,3,4,4]}
  />
)
