# histogram-slider

Simple range slider with histogram graph.

## Example
```
<HistogramSlider
    tally={{
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
      }}
    onChange={(handlePosition) => {
      console.log('new handle positions', handlePosition);
    }}
  />
/>
```

![Example screenshot](https://i.imgur.com/YaDbZ2r.png)
