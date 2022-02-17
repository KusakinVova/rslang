import { createDomNode } from '../../../helpers/utils';
import { authState } from '../../pages/LogIn';
import { SprintApp } from './SprintApp';
import { addCorretAnswer } from '../textbook/learnedWords';

export class WordCards {
  onComplete: () => void | undefined;
  wordOnEng: HTMLElement;
  wordOnRus: HTMLElement;
  currWordIndex: number;
  wordListLength: number;
  parent: SprintApp;
  rightAnswerQueueValueElem: HTMLElement;
  pointsPerAnswerValueElem: HTMLElement;
  totalPointsValueElem: HTMLElement;
  pointsPerAnswer: number;
  rightAnswerQueue: number;

  constructor(parent: SprintApp) {
    this.parent = parent;
    this.currWordIndex = 0;
    this.wordListLength = parent.wordList.length;
    const card = createDomNode(parent.container, 'div');
    this.onComplete = () => undefined;

    const pointsContainer = createDomNode(card, 'h5', '', 'mb-4');
    createDomNode(pointsContainer, 'span', 'Очки: ');
    this.totalPointsValueElem = createDomNode(pointsContainer, 'span', '0');

    const rightAnswerQueueContainer = createDomNode(card, 'h6', '', 'mb-2');
    createDomNode(rightAnswerQueueContainer, 'span', 'Кол-во правильных ответов подряд: ');
    this.rightAnswerQueueValueElem = createDomNode(rightAnswerQueueContainer, 'span', '0');
    this.rightAnswerQueue = 0;

    const pointsPerAnswerContainer = createDomNode(card, 'h6', '', 'mb-3');
    createDomNode(pointsPerAnswerContainer, 'span', 'Кол-во очков за правильный ответ: ');
    this.pointsPerAnswer = 10;
    this.pointsPerAnswerValueElem = createDomNode(pointsPerAnswerContainer, 'span', `+${this.pointsPerAnswer}`);

    this.wordOnEng = createDomNode(card, 'h4');
    this.wordOnRus = createDomNode(card, 'h5');

    const wrongButton = createDomNode(card, 'Button', 'Неверно', 'btn', 'btn-danger', 'me-2', 'my-3');
    wrongButton.onclick = () => {
      this.checkAnswer(false);
    };

    const rightButton = createDomNode(card, 'Button', 'Верно', 'btn', 'btn-success', 'my-3');
    rightButton.onclick = () => {
      this.checkAnswer(true);
    };
    document.onkeydown = (event) => {
      this.keyHandler(event);
    };
  }

  start() {
    if (this.currWordIndex < this.wordListLength) {
      this.wordOnEng.innerText = this.parent.wordList[this.currWordIndex].word;
      this.wordOnRus.innerText = this.parent.wordList[this.currWordIndex].testedAnswer;
    } else {
      document.onkeydown = null;
      this.onComplete();
    }
  }

  checkAnswer(isTrue: boolean) {
    const res = isTrue === this.parent.wordList[this.currWordIndex].isTruePair;

    if (authState.isAuthenticated) {
      addCorretAnswer.call(this, res);
    }

    if (res) {
      this.rightAnswerQueue += 1;
    } else {
      this.rightAnswerQueue = 0;
    }
    this.rightAnswerQueueValueElem.innerText = this.rightAnswerQueue.toString();

    this.parent.totalPoints += this.pointsPerAnswer;
    this.totalPointsValueElem.innerText = this.parent.totalPoints.toString();

    this.pointsPerAnswer = 10 * 2 ** Math.floor(this.rightAnswerQueue / 4);
    this.pointsPerAnswerValueElem.innerText = `+${this.pointsPerAnswer}`;

    this.parent.wordList[this.currWordIndex].userAnswer = res;
    this.currWordIndex += 1;
    this.start();
  }

  keyHandler(event: KeyboardEvent) {
    if (event.code == 'ArrowRight') {
      this.checkAnswer(true);
    }
    if (event.code == 'ArrowLeft') this.checkAnswer(false);
  }
}
