import { API_URL } from '../../../api/config';
import { getWords } from '../../../api/words.api';
import { IWord } from './../../../helpers/interfaces';

export const renderWords = async () => {
  const words: IWord[] = await getWords();
  return words.map((word) => renderWordCard(word)).join('');
};

export const renderWordCard = (word: IWord) => `
      <div class="col">
        <div class="card shadow-sm h-100">
          <img src="${API_URL}/${word.image}" alt="image" width="100%" height="240">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">
                ${word.word}
                <small class="text-muted">${word.transcription}</small>
              </h5>
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer" width="32" height="32" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <strong class="d-inline-block mb-2 text-success">${word.wordTranslate}</strong>
            </div>
            <ul class="list-group list-group-flush border-bottom border-primary">
              <li class="list-group-item">${word.textMeaning}</li>
              <li class="list-group-item">${word.textMeaningTranslate}</li>
            </ul>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${word.textExample}</li>
              <li class="list-group-item">${word.textExampleTranslate}</li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
`;
