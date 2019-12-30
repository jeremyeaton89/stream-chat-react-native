import React, { PureComponent } from 'react';
import { withChatContext } from '../context';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { LocalStorage } from '../storage';

import { LoadingIndicator } from './LoadingIndicator';
import { MessageSimple } from './MessageSimple';
import { Attachment } from './Attachment';
import { ChannelInner } from './ChannelInner';

/**
 * Channel - Wrapper component for a channel. It needs to be place inside of the Chat component.
 * ChannelHeader, MessageList, Thread and MessageInput should be used as children of the Channel component.
 *
 * @example ./docs/Channel.md
 * @extends PureComponent
 */
const Channel = withChatContext(
  class Channel extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { error: false };
    }
    static propTypes = {
      /** Which channel to connect to */
      channel: PropTypes.shape({
        watch: PropTypes.func,
      }).isRequired,
      /** Client is passed via the Chat Context */
      client: PropTypes.object.isRequired,
      isOnline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      /**
       * Loading indicator UI component. This will be shown on the screen until the messages are
       * being queried from channel. Once the messages are loaded, loading indicator is removed from the screen
       * and replaced with children of the Channel component.
       *
       * Defaults to and accepts same props as: [LoadingIndicator](https://getstream.github.io/stream-chat-react-native/#loadingindicator)
       */
      LoadingIndicator: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
      ]),
      /**
       * Error indicator UI component. This will be shown on the screen if channel query fails.
       *
       * Defaults to and accepts same props as: [LoadingErrorIndicator](https://getstream.github.io/stream-chat-react-native/#loadingerrorindicator)
       *
       * */
      LoadingErrorIndicator: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
      ]),
      /**
       * Empty state indicator UI component. This will be shown on the screen if channel has no messages.
       *
       * Defaults to and accepts same props as: [EmptyStateIndicator](https://getstream.github.io/stream-chat-react-native/#emptystateindicator)
       *
       * */
      EmptyStateIndicator: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
      ]),
      /**
       * Message UI component to display a message in message list.
       *
       * Available built-in component (also accepts the same props as): [MessageSimple](https://getstream.github.io/stream-chat-react-native/#messagesimple)
       *
       * */
      Message: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
      /**
       * Custom component for Image. Defaults to [Image](https://facebook.github.io/react-native/docs/image)
       * CachedImage from [`@stream-io/react-native-cached-image`](https://www.npmjs.com/package/@stream-io/react-native-cached-image) is an alternative to cache images
       * on device for use in offline mode.
       **/
      ImageComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.elementType,
      ]),
      /**
       * Instance of LocalStorage for offline storage
       * */
      storage: PropTypes.instanceOf(LocalStorage),
      /**
       * Attachment UI component to display attachment in individual message.
       *
       * Available built-in component (also accepts the same props as): [Attachment](https://getstream.github.io/stream-chat-react-native/#attachment)
       * */
      Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
    };

    static defaultProps = {
      LoadingIndicator,
      Message: MessageSimple,
      Attachment,
    };

    render() {
      if (!this.props.channel.cid) {
        return <Text>Please select a channel first</Text>;
      }

      return <ChannelInner {...this.props} />;
    }
  },
);

export { Channel };
