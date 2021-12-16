import * as React from 'react';

export interface Props {
  title: string
  classes?: string;
}

export interface State { }

export class AppTitle extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={this.props.classes}>
          <h1>
            {this.props.title}
          </h1>
        </div>
      </>
    );
  }

}
