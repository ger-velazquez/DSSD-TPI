import * as React from 'react';

export interface Props {
  collectionOfContent: string[];
}

export interface State { }

export class GenericFormSelectValues extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
      {this.props.collectionOfContent.map( (content: string) => {
        return (
          <option value={content}> {content} </option>
        )
      } )}
      </>
    );
  }

}

// export default injectSheet(style)(component)
