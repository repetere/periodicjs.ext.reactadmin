import React, { Component, } from 'react';
import { Notification, } from 're-bulma';

class NotificationUI extends Component{
  render() {
    // closeButtonProps={{ onClick: () => console.log('clicked',this.props) }}
    return <Notification
      color="isDanger"
      closeButtonProps={this.props.hide}
      style={{ marginBottom: '1rem', marginLeft: '1rem', }}
      enableCloseButton
      className="animated fadeInLeft Medium-Speed"
      >
      {this.props.text}
    </Notification>;
  }
}

class Overlay extends Component {
  render() {
    // console.log('Overlay this.props', this.props);
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
