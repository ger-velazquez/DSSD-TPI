import * as React from 'react';

export interface Props {
    classes?: string;
}

export interface State {}

export class GenericDivider extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={`${this.props.classes} pb-2 pt-2`} style={{ borderBottom: '1px solid #ddd' }} />
      </>
    );
  }

}
