import React, { Component, } from 'react';
import { Notification, Modal, Content, } from 're-bulma';
import AppSectionLoading from '../AppSectionLoading';
import { getRenderedComponent, } from '../AppLayoutMap';
import utilities from '../../util';

class NotificationUI extends Component {
  render() {
    let colorMap = {
      primary: 'isPrimary',
      info: 'isInfo',
      success: 'isSuccess',
      warning: 'isWarning',
      warn: 'isWarning',
      error: 'isDanger',
      danger: 'isDanger',
    };
    // closeButtonProps={{ onClick: () => console.log('clicked',this.props) }}
    return <Notification
      color={colorMap[this.props.type]}
      closeButtonProps={this.props.hide}
      style={{ marginBottom: '1rem', marginLeft: '1rem', }}
      enableCloseButton
      className="animated fadeInLeft Medium-Speed"
      >
      {(typeof this.props.text!=='string')? this.props.dynamicRenderComponent(this.props.text) : this.props.text}
    </Notification>;
  }
}

class ModalUI extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      ui_is_loaded: false,
      async_data_is_loaded: false,
    };
    this.uiLayout = {};
    this.title = '';
    this.footer = '';
    this.text = '';
    this.getState = this.props.getState;
    this.getRenderedComponent = this.props.dynamicRenderComponent.bind(this);
    this.fetchData = utilities.fetchDynamicContent.bind(this);
  }
  handleComponentLifecycle () {
    this.uiLayout = {};
    if (typeof this.props.pathname === 'string') this.fetchData(this.props.pathname);
    this.title = this.props.title;
    this.footer = this.props.footer;
    this.text = this.props.text;
    this.setState({ ui_is_loaded: false, async_data_is_loaded: false, });
  }
  componentDidMount () {
    this.handleComponentLifecycle();
  }
  componentWillReceiveProps () { 
    this.handleComponentLifecycle();
  }
  render () {
    let initialize = (content) => {
      let modelContent = (content) ? content : ((typeof this.text !== 'string') ? this.props.dynamicRenderComponent(this.text) : this.text);
      let footerContent = (this.footer)
        ? ((typeof this.footer === 'object')? this.props.dynamicRenderComponent(this.footer) : <div style={{ padding: '20px', }} >{this.footer}</div>)
          : undefined; 
      return (<div style={Object.assign({
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(17,17,17,.6)',
      },this.props.overlayProps)}>
          <Modal
            type="card"
            headerContent={(typeof this.title === 'object')? this.props.dynamicRenderComponent(this.title) : this.title}
            footerContent={footerContent}
            isActive={true}
            onCloseRequest={this.props.hide}
            className={`animated ${(this.props.animation? this.props.animation: 'zoomIn')} Medium-Speed`}
            showOverlayCloseButton={false}
            >
            <Content>
              {modelContent}
          </Content>
        </Modal>
      </div>);
    };
    if (typeof this.props.pathname === 'string') {
      return (this.state.ui_is_loaded === false) ? initialize(<AppSectionLoading/>) : initialize(this.uiLayout);
    } else return initialize();
  }
}

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
  }
  render() {
    // console.log('Overlay this.props.notification', this.props.notification);
    window.overlayProps = this.props;
    let overlayStyleOverrides = this.props.getState().settings.ui.overlayStyleProps;
    let notices = (this.props.notification.notifications && this.props.notification.notifications.length > 0)
      ? this.props.notification.notifications.map((notice, key) => <NotificationUI dynamicRenderComponent={this.getRenderedComponent} hide={{
        onClick: () => {
          this.props.hideNotification(notice.id);
        },
      }} key={key} {...notice} />)
      : null;
    let modal = (this.props.notification.modals && this.props.notification.modals.length > 0)
      ? <ModalUI {...this.props.notification.modals[ this.props.notification.modals.length - 1 ]}
        getState={this.props.getState}
        hide={() => {
          this.props.hideModal(this.props.notification.modals[0].id);
        } }  
        dynamicRenderComponent={this.getRenderedComponent} />
      : null;
    return (
      <div className="__reactadmin_overlay" {...overlayStyleOverrides} style={{ position: 'fixed', bottom: 0, width: 'auto', zIndex:100000, }}>
        {modal}
        {notices}
      </div>
    );
  }
}

export default Overlay;
