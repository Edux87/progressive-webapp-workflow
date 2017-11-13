import { Component } from 'preact';
import { route } from 'preact-router';
import Fab from 'preact-material-components/Fab';
import Card from 'preact-material-components/Card';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import 'preact-material-components/Fab/style.css';
import Icon from 'preact-material-components/Icon';
import style from './style.css';

export default class Stage extends Component {

  static GameState = {
    NOTLOADED: 0,
    READY: 1,
    PLAYING: 2,
    FINISHED: 3
  };

  constructor() {
    super();
    this.state = {
      score: '',
      gameState: Stage.GameState.NOTLOADED,
      highScore: localStorage.highscore
    };
  }

  componentDidMount() {
    // if (!localStorage.uname) {
    //   route('/');
    // } else {
      this.initGame();
    // }
  }

  initGame() {
    require.ensure(
      '../../games/the_attack/GameScene',
      require => {
        this.setState(
          {
            gameState: Stage.GameState.READY
          },
          () => {
            const GameScene = require('../../games/the_attack/GameScene').default;
            this.scene = new GameScene(this.canvas, {
              onScore: () => {
                this.setState(
                  {
                    score: this.state.score + 1
                  },
                  () => {
                    if (this.state.score % 20 === 0) {
                      // this.scene.increaseGameSpeed();
                      console.log('ok ', this.state.score);
                    }
                  }
                );
              },
              onInit: () => {
                this.setState({
                  score: 0,
                  isLoaded: true,
                  gameState: Stage.GameState.PLAYING
                });
              },
              onFinish: () => {
                const highScore = localStorage.highscore || 0;
                if (this.state.score > highScore) {
                  localStorage.highscore = this.state.score;
                }
                this.setState({
                  gameState: Stage.GameState.FINISHED,
                  highScore: localStorage.highscore || this.state.score
                });
              }
            });
          }
        );
      },
      'gameengine'
    );
  }

  render() {
    return (
      <div class={style.page}>
        <h1>Game Name
        {this.state.gameState == Stage.GameState.FINISHED &&
          <span> High score - {this.state.highScore}</span> }
        </h1>
        <Card>
          {!this.state.isLoaded &&
            <div class={style.progress}>
              <LinearProgress indeterminate={true} />
            </div>}
          <Fab
            className={
              this.state.gameState == Stage.GameState.FINISHED
                ? style.fab + ' ' + style.appear
                : style.fab
            }
            onClick={() => {
              this.setState({
                score: 0,
                isReady: true
              });
              this.initGame();
            }}
          >
            <Icon>face</Icon>
          </Fab>
          {this.state.gameState !== Stage.GameState.NOTLOADED &&
            <canvas
              id="stage"
              className={style.stage}
              ref={canvas => (this.canvas = canvas)}
            />}
        </Card>
      </div>
    );
  }

}
