import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: [
        { Alcohol: 1, Flavanoids: 2.5 },
        { Alcohol: 2, Flavanoids: 3.0 },
        { Alcohol: 3, Flavanoids: 6.0 },
        { Alcohol: 2, Flavanoids: 5.0 },
        { Alcohol: 2, Flavanoids: 5.0 },
        { Alcohol: 3, Flavanoids: 8.0 },
        { Alcohol: 1, Flavanoids: 5.0 },
        { Alcohol: 12, Flavanoids: 3.0 },
        { Alcohol: 9, Flavanoids: 5.0 },
        { Alcohol: 5, Flavanoids: 6.0 },
        { Alcohol: 8, Flavanoids: 8.0 },
        { Alcohol: 7, Flavanoids: 3.0 },
        { Alcohol: 6, Flavanoids: 5.0 },
        { Alcohol: 5, Flavanoids: 6.0 },
        { Alcohol: 4, Flavanoids: 8.0 },
        { Alcohol: 10, Flavanoids: 3.0 },
        { Alcohol: 11, Flavanoids: 5.0 },
        { Alcohol: 8, Flavanoids: 6.0 },
        { Alcohol: 9, Flavanoids: 8.0 },
        // Add more data as needed
      ],
      flavanoidsData: [
        { Alcohol: 1, Ash: 2.5, Hue: 1.5, Magnesium: 10 },
        { Alcohol: 2, Ash: 3.0, Hue: 2.0, Magnesium: 15 },
        { Alcohol: 3, Ash: 3.0, Hue: 4.0, Magnesium: 10 },
        { Alcohol: 2, Ash: 2.0, Hue: 5.0, Magnesium: 15 },
        // Add more data as needed
      ],
    }
  }

  calculateMean = (data) => {
    const sum = data.reduce((acc, item) => acc + item, 0);
    return Math.round(sum / data.length).toFixed(3);
  };

  calculateMedian = (data) => {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      let val = (sortedData[middle - 1] + sortedData[middle]) / 2
      return Math.round(val).toFixed(3);
    } else {
      return Math.round(sortedData[middle]).toFixed(3);
    }
  };

  calculateMode = (data) => {
    const counts = {};
    data.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });

    let mode;
    let maxCount = 0;

    Object.keys(counts).forEach((key) => {
      if (counts[key] > maxCount) {
        mode = key;
        maxCount = counts[key];
      }
    });

    return Math.round(mode).toFixed(3);
  }

  calculateGamma = (data) => {
    return data.map(item => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium,
    }));
  };

  render() {
    const { dataset, flavanoidsData } = this.state;
    const gammaData = this.calculateGamma(flavanoidsData);
    const classes1 = Array.from(new Set(flavanoidsData.map((item) => item.Alcohol)));

    const classWiseStats1 = classes1.map((classNum) => {

      const classData = gammaData.filter((item) => item.Alcohol === classNum);
      const gammaValues = classData.map((item) => item.Gamma);

      return {
        class: classNum,
        mean: this.calculateMean(gammaValues),
        median: this.calculateMedian(gammaValues),
        mode: this.calculateMode(gammaValues),
      };
    });

    const classes = Array.from(new Set(dataset.map((item) => item.Alcohol)));

    const classWiseStats = classes.map((classNum) => {
      const classData = dataset.filter((item) => item.Alcohol === classNum);
      const flavanoidsData = classData.map((item) => item.Flavanoids);
      return {
        class: classNum,
        mean: this.calculateMean(flavanoidsData),
        median: this.calculateMedian(flavanoidsData),
        mode: this.calculateMode(flavanoidsData),
      };
    });

    return (
      <div className='wrap-div'>
        <h1>Data Visualization Task</h1>
        <br />
        <h2>Question 1 - Write utility functions to calculate the class-wise mean, median, mode of
          “Flavanoids” for the entire dataset.</h2>
        <div className='table-div'>
          <table>
            <thead>
              <tr>
                <th>Measure</th>
                {classes.map((classNum) => (
                  <th key={classNum}>Class {classNum}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flavanoids Mean</td>
                {classWiseStats.map((stats) => (
                  <td key={stats.class}>{stats.mean}</td>
                ))}
              </tr>
              <tr>
                <td>Flavanoids Median</td>
                {classWiseStats.map((stats) => (
                  <td key={stats.class}>{stats.median}</td>
                ))}
              </tr>
              <tr>
                <td>Flavanoids Mode</td>
                {classWiseStats.map((stats) => (
                  <td key={stats.class}>{stats.mode}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Question 2 - Write a function that helps you create a new property “Gamma” for each point of
          the dataset. “Gamma” can be calculated as Gamma = (Ash * Hue) / Magnesium.
          Thereafter, calculate the class-wise mean, median, mode of “Gamma” for the
          entire dataset.</h2>
        <div className='table-div'>
          <table>
            <thead>
              <tr>
                <th>Measure</th>
                {classes1.map((classNum) => (
                  <th key={classNum}>Class {classNum}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gamma Mean</td>
                {classWiseStats1.map((stats) => (
                  <td key={stats.class}>{stats.mean}</td>
                ))}
              </tr>
              <tr>
                <td>Gamma Median</td>
                {classWiseStats1.map((stats) => (
                  <td key={stats.class}>{stats.median}</td>
                ))}
              </tr>
              <tr>
                <td>Gamma Mode</td>
                {classWiseStats1.map((stats) => (
                  <td key={stats.class}>{stats.mode}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default App;
