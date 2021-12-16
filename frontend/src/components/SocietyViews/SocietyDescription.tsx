import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { SocietyRegistrationWithForm } from '../../interfaces/FormInterfaces';
import { SocietySearchConditions } from '../../interfaces/SocietyRegistrationInterfaces';
import SocietyService from '../../services/SocietyService';
import { AppTitle } from '../Generic/AppTitle';
import { SocietyData } from './SocietyData';

type PathParamsType = {
  hash: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
  someString: string,
}

interface State {
  societyRegistration: SocietyRegistrationWithForm | null;
}

class SocietyDescription extends React.Component<PropsType, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      societyRegistration: null
    }
  }
  
  async componentDidMount() {
    const hash = this.props.match.params.hash;
    const response = await SocietyService.getSocietyByCondition(hash, SocietySearchConditions.hash);
    const societyRegistration = response[0];
    this.setState({
      societyRegistration
    })
  }
  
  
  render() {

    
    if (!!this.state.societyRegistration === false) {
      return null;
    }

    return (
      <>
      <div className="mb-5">
        <AppTitle title="Informacion de la sociedad" />
      </div>
        <SocietyData
          societyData={this.state.societyRegistration!}
        />
      </>
    );
  }

}

export default withRouter(SocietyDescription)
