import * as React from 'react';
import { SAFormV2 } from '../SAFormV2';

export interface Props {}

export interface State {}

export class ApplicantsHomepage extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
      <SAFormV2/>
      </>
    );
  }

}
