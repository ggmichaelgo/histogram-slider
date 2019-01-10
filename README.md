# histogram-slider

Simple range slider with histogram graph.

## Example
```
<HistogramSlider
    valueList={[
      1,1,1,1,2,2,3,3,3,4,5,6,7,8,8,8,8,8,8,
      1,11,11,11,12,12,13,13,13,14,15,16,17,18,18,18,18,18,18,
      1,21,21,21,22,22,23,23,23,24,25,26,27,28,28,28,28,28,28
    ]}
    onChange={(handlePosition) => {
      console.log('new handle positions', handlePosition);
    }}
  />
/>
```

![Example screenshot](https://i.imgur.com/n7Myq3m.png)
