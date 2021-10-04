import * as React from 'react';
import HttpClient from '../services/HttpClient';


export interface Props {}

export interface State {
    testInterface: any;
}

export class Test extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
    this.state = {
        testInterface: "",
    }
  }
  async componentDidMount() {
    const response = await HttpClient.get(
        "api/associates"
    )
    console.log(response)
    this.setState({
        testInterface: response
    })
}

  render() {
      if (this.state.testInterface == null) {
          return null;
      }
    console.log(this.state.testInterface);
    
    return (
      <>
      <div>
          
      </div>
      </>
    );
  }

}

// export default injectSheet(style)(component)
