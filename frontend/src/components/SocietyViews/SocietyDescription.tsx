import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type PathParamsType = {
  fileNumber: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
  someString: string,
}

class SocietyDescription extends React.Component<PropsType> {

  constructor(props: any) {
    super(props);
  }
  
  render() {

    const test = this.props.match.params.fileNumber;

    return (
      <>
      Nueva Vista dice {test}
      </>
    );
  }

}

export default withRouter(SocietyDescription)
