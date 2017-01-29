import React, { Component, } from 'react';
import { Notification, Modal, Content, } from 're-bulma';
import { getRenderedComponent, } from '../AppLayoutMap';

class NotificationUI extends Component{
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

class ModalUI extends Component{
  render() {
    let footerContent = (this.props.footer)
      ? ((typeof this.props.footer==='object')? this.props.dynamicRenderComponent(this.props.footer) : <div style={{ padding: '20px', }} >{this.props.footer}</div>)
        : undefined;  
    
    return (<div style={{
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(17,17,17,.86)',
    }}>
        <Modal
          type="card"
          headerContent={(typeof this.props.title==='object')? this.props.dynamicRenderComponent(this.props.title) : this.props.title}
          footerContent={footerContent}
          isActive={true}
          onCloseRequest={this.props.hide}
          className="animated bounceIn Slow-Speed"
          showOverlayCloseButton={false}
          >
          <Content>
            {(typeof this.props.text!=='string')? this.props.dynamicRenderComponent(this.props.text) : this.props.text}
        </Content>
      </Modal>
    </div>);
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
    let notices = (this.props.notification.notifications && this.props.notification.notifications.length > 0)
      ? this.props.notification.notifications.map((notice, key) => <NotificationUI dynamicRenderComponent={this.getRenderedComponent} hide={{
        onClick: () => {
          this.props.hideNotification(notice.id);
        },
      }} key={key} {...notice} />)
      : null;
    let modal = (this.props.notification.modals && this.props.notification.modals.length > 0) ? <ModalUI {...this.props.notification.modals[ 0 ]}
      hide={() => {
        this.props.hideModal(this.props.notification.modals[ 0 ].id);
      } }  
      dynamicRenderComponent={this.getRenderedComponent} /> : null;
    return (
      <div style={{ position: 'fixed', bottom: 0, width: 'auto', }}>
        {modal}
        {notices}
      </div>
    );
  }
}

export default Overlay;
