import constants from '../constants';
import FileSaver from 'file-saver';
import mime from 'mime';
import path from 'path';
// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';

const getBlobData = (options) => {
  // console.debug('getBlobData', { options });
  let { data, filename, type, } = options;
  if (!data) {
    data = options;
  }
  if (!type || type === 'json') {
    type = 'application/json;charset=utf-8';
  }
  if (type === 'json' || type === 'application/json;charset=utf-8') {
    data = JSON.stringify(data, null, 2);
  }
  if (type && filename && path.extname(filename) === '') {
    filename += '.'+mime.extension(type);
  }
  if (!filename) {
    filename = 'output.json';
  }
  // console.debug('before blob data',data );
  let blob = new Blob([ data, ], { type, });
  // let blob = new Blob([ data, ], { type, });
  FileSaver.saveAs(blob, filename);

  return { filename, type, };
};

const output = {
  fileSaver(options) {
    let { filename, type, } = getBlobData(options);
    
    try {
      return {
        type: constants.output.OUTPUT_FILE_DATA_SUCCESS,
        payload: { filename, type, },
      };
    } catch (e) {
      return {
        type: constants.output.OUTPUT_FILE_DATA_ERROR,
        payload: { filename, type, e, },
      };
    }
  },
};

export default output;