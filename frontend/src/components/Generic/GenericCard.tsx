import * as React from 'react';
import { Card } from "react-bootstrap";

export interface Props {
  classes?: string;
  bodyClasses?: string;
}

export interface State { }

export class GenericCard extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Card className={this.props.classes} style={{ borderRadius: '15px', backgroundColor: 'white' }}>
          {this.props.children}
        </Card>
      </>
    );
  }

}
