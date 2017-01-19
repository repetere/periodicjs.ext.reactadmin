import { Component } from 'react';
// import { Container, Content, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';
import { getRenderedComponent, } from '../components/AppLayoutMap';

let DocumentationLayout = {
  component: 'Hero',
  props: { size: 'isFullheight', },
  children: [ {
    component: 'HeroBody',
    props:{},
    children: [ {
      component: 'Container',
      props:{},
      children:[
        {
          component: 'div',
          children: 'div text'
        },
        {
          component: 'Title',
          // props: {
          // },
            children: 'Documentation Page',
        }]
    }]
  }]
};

class Documentation extends Component {
  // render() {
  //   return (
  //     <Container>
  //       <Content>  
  //         <div>Documentation</div>
  //       </Content>  
  //     </Container>
  //   );
  // }
    // constructor(props) {
  //   super(props);
  //   console.log({ props });
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log('Login componentWillReceiveProps nextProps', nextProps);
  //   // this.setState(nextProps);
  // }
  render() {
    // console.log(this.props)
    return getRenderedComponent(DocumentationLayout);
  }
}

export default Documentation;
