import React, { FunctionComponent } from 'react';
import Dropzone from 'react-dropzone';
import { DropMe } from './style';

type DropzoneJSONProps = {
  handleDropAccepted: (accepted: any) => void;
  handleDropRejected: () => void;
  fileName: string;
};

const DropzoneJSON: FunctionComponent<DropzoneJSONProps> = ({
  handleDropAccepted,
  handleDropRejected,
  fileName,
}) => (
  <Dropzone
    accept="application/json"
    multiple={false}
    onDropAccepted={handleDropAccepted}
    onDropRejected={handleDropRejected}>
    {({ getRootProps, getInputProps }) => (
      <DropMe {...getRootProps()}>
        <input {...getInputProps()} />
        <h3>Want to upload JSON?</h3>
        <p>Click or drag&amp;drop file here. Only *.json file is accepted.</p>
        <p>JSON should be in the following format (array of objects):</p>
        <pre style={{ fontSize: '11px' }}>
          {JSON.stringify(
            [
              {
                question: 'The question',
                skill: ['JS'],
                level: ['Junior', 'Middle'],
                answer: 'The main answer',
                answers: [
                  {
                    text: 'Additional answer #1',
                  },
                  {
                    text: 'Additional answer #2',
                  },
                ],
                practice: 'practice',
                notes: 'Some notes',
              },
            ],
            null,
            2,
          )}
        </pre>
        <p>
          <small>
            <em>
              P.S. In case wrong JSON format you should fix it by yourself or
              contact admin
            </em>
          </small>
        </p>
        <p>{fileName !== '' ? `You have added - ${fileName}` : ''}</p>
      </DropMe>
    )}
  </Dropzone>
);

export default DropzoneJSON;
