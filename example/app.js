/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import Dailymotion from '../';

const videos = [
  { id: 'x26ezrb', name: 'Hackathon BeMyApp/Dailymotion' },
  { id: 'x26ezj5', name: 'Greetings' },
  { id: 'x26m1j4', name: 'Wildlife' },
];

const qualities = ['auto', '240', '380', '480', '720', '1080', '1440', '2160'];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: 0,
      quality: 'auto',
      volume: 1,
      paused: false,
    };

    this.handlePause = this.handlePause.bind(this);
    this.handlePlayerPause = this.handlePlayerPause.bind(this);
    this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleQuality = this.handleQuality.bind(this);
  }

  selectVideo(index) {
    this.setState({ video: index });
  }

  handlePause(event) {
    this.setState({
      paused: event.target.checked,
    });
  }

  handlePlayerPause() {
    this.setState({ paused: true });
  }
  handlePlayerPlay() {
    this.setState({ paused: false });
  }

  handleVolume(event) {
    this.setState({
      volume: parseFloat(event.target.value),
    });
  }

  handleQuality(event) {
    this.setState({
      quality: qualities[event.target.selectedIndex],
    });
  }

  render() {
    const video = videos[this.state.video];
    return (
      <div className="row">
        <div className="col s3">
          <h3>Video</h3>
          <div className="collection">
            {videos.map((choice, index) => (
              <a
                href={`#!/video/${index}`}
                className={`collection-item ${video === choice ? 'active' : ''}`}
                onClick={() => this.selectVideo(index)}
              >
                {choice.name}
              </a>
            ))}
          </div>
          <h3>Paused</h3>
          <p>
            <input
              type="checkbox"
              id="paused"
              checked={this.state.paused}
              onChange={this.handlePause}
            />
            <label htmlFor="paused">Paused</label>
          </p>
          <h3>Volume</h3>
          <input
            type="range"
            value={this.state.volume}
            min={0}
            max={1}
            step={0.01}
            onChange={this.handleVolume}
          />
          <h3>Quality</h3>
          <select className="browser-default" onChange={this.handleQuality}>
            {qualities.map(quality => (
              <option value={quality}>{quality}</option>
            ))}
          </select>
        </div>
        <div className="col s9 center-align">
          <Dailymotion
            video={video.id}
            width={640}
            height={480}
            autoplay
            theme="dark"
            sharing={false}
            uiShowStartScreenInfo={false}
            controls={false}
            quality={this.state.quality}
            volume={this.state.volume}
            paused={this.state.paused}
            onPause={this.handlePlayerPause}
            onPlay={this.handlePlayerPlay}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('example'));
