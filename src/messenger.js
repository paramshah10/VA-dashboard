import React, { Component } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

/*global FB*/

class Messenger extends Component {
    componentDidMount(){
        window.fbAsyncInit = function() {
          FB.init({
            appId            : '203947964382425',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v6.0'
          });
          
          // FB.login(function(response) {
          //   if (response.authResponse) {
          //    console.log('Welcome!  Fetching your information.... ');
          //    FB.api('/me', function(response) {
          //      console.log('Good to see you, ' + response.name + '.');
          //    });
          //   } else {
          //    console.log('User cancelled login or did not fully authorize.');
          //   }
          // });
  
          // FB.getLoginStatus(function(response) {
          //   //this.statusChangeCallback(response);
          // });
          
        };
  
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        return(
            <MessengerCustomerChat
            pageId="100902811579573"
            appId="203947964382425"
          />
        )
    }
}

export default Messenger;