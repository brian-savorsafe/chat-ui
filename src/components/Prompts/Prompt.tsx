import { Avatar, AvatarProps, Card, Flex, Text } from '@radix-ui/themes';

import './Prompts.scss';

export type PromptProps = {
  id?: string | number;
  avatar?: AvatarProps;
  label?: React.ReactNode;
  description?: React.ReactNode;
  subItems?: PromptProps[];
  disabled?: boolean;
  onItemClick?: (data: PromptProps) => void;
};

export const Prompt: React.FC<PromptProps> = (props) => {
  const { avatar, label, description, disabled, subItems, onItemClick } = props;

  const renderAvatar = () => {
    if (avatar) {
      return <Avatar {...avatar} />;
    }

    return null;
  };

  const renderText = (text: React.ReactNode) => {
    if (typeof text === 'string') {
      return (
        <Text size="2" as="div">
          {text}
        </Text>
      );
    }

    return text;
  };

  const renderLabel = (label: React.ReactNode) => {
    if (!label) {
      return null;
    }

    let displayLabel: React.ReactNode = label;
    if (typeof label === 'string') {
      if (!description) {
        displayLabel = renderText(label);
      } else {
        displayLabel = (
          <Text size="2" as="div" weight="bold">
            {label}
          </Text>
        );
      }
    }

    return <div className="chat-ui-prompt-label">{displayLabel}</div>;
  };

  const renderDescription = (description: React.ReactNode) => {
    if (!description) {
      return null;
    }

    let displayDescription: React.ReactNode = description;
    if (typeof description === 'string') {
      if (!label) {
        displayDescription = renderText(description);
      } else {
        displayDescription = (
          <Text size="2" as="div" color="gray">
            {description}
          </Text>
        );
      }
    }

    return <div className="chat-ui-prompt-description">{displayDescription}</div>;
  };

  return (
    <Card asChild>
      <div
        className={`chat-ui-prompt ${onItemClick && !disabled ? 'clickable' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => onItemClick?.(props)}
      >
        <Flex gap="2" align="center">
          {renderAvatar()}
          <Flex direction="column" gap="1">
            {renderLabel(label)}
            {renderDescription(description)}
          </Flex>
        </Flex>
      </div>
    </Card>
  );
};
