import { IPage } from '../../helpers/interfaces';

const AudioCall: IPage = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Аудиовызов</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default AudioCall;
