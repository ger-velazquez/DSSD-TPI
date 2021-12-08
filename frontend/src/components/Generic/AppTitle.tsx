import * as React from 'react';

export interface Props {
  title: string
}

export interface State { }

export class AppTitle extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <h1>
            {this.props.title}
          </h1>
        </div>
      </>
    );
  }

}
