import * as React from 'react';
import { Link } from 'react-router-dom';
import { NavigatorInterface } from '../../interfaces/NavigatorInterface';
import { SocietyRegistrationRoutes } from '../../interfaces/SocietyRegistrationInterfaces';

export interface Props {
  collectionOfPath: NavigatorInterface[];
}

export interface State { }

export class Navigator extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        {
          this.props.collectionOfPath.map((element) => {
            return (
              <div>
                <Link to={element.path} >
                  <div style={{ color: "black" }}>
                    {element.text}
                  </div>
                </Link>
              </div>
            )
          })
        }
      </>
    );
  }

}
