import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import type { IconButtonProps } from '@radix-ui/themes';
import * as React from 'react';

import ActionButton, { ActionButtonContext } from '../ActionButton';
import RecordingIcon from './RecordingIcon';

function SpeechButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { speechRecording, onSpeechDisabled, prefixCls } = React.useContext(ActionButtonContext);

  let icon: React.ReactNode = null;
  if (speechRecording) {
    icon = <RecordingIcon className={`${prefixCls}-recording-icon`} />;
  } else if (onSpeechDisabled) {
    icon = <AudioMutedOutlined />;
  } else {
    icon = <AudioOutlined />;
  }

  return (
    <ActionButton variant="ghost" {...props} action="onSpeech" ref={ref}>
      {icon}
    </ActionButton>
  );
}

export default React.forwardRef(SpeechButton);
