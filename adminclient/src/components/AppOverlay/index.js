import React, { Component, } from 'react';
import { Notification, } from 're-bulma';
import { getRenderedComponent, } from '../AppLayoutMap';

class NotificationUI extends Component{
  constructor(props) {
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
  }
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
      {(typeof this.props.text!=='string')? this.getRenderedComponent(this.props.text) : this.props.text}
    </Notification>;
  }
}

class Overlay extends Component {
  render() {
    // console.log('Overlay this.props.notification', this.props.notification);
    window.overlayProps = this.props;
    let notices = (this.props.notification.notifications && this.props.notification.notifications.length > 0)
      ? this.props.notification.notifications.map((notice, key) => <NotificationUI hide={{
        onClick: () => {
          this.props.hideNotification(notice.id);
        },
      }} key={key} {...notice} />)
      : null;
    return (
      <div style={{ position: 'fixed', bottom: 0, width: 'auto', }}>
        {notices}
      </div>
    );
  }
}

export default Overlay;
