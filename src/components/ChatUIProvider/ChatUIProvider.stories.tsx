import { DashIcon, UpdateIcon, UploadIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Inset, SegmentedControl, Text } from '@radix-ui/themes';

import { ChatUIProvider } from '../../index';
import { Bubble } from '../Bubble';
import { Sender } from '../Sender';

export default {
  title: 'ChatUIProvider',
  component: ChatUIProvider,
};

const BubbleList = Bubble.List;

const renderMessage = () => {
  return (
    <span style={{ color: 'red' }}>
      The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes
      beauty and makes reading easier and more pleasant.
    </span>
  );
};

const renderContent = () => {
  return (
    <Box maxWidth="240px">
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 140,
              backgroundColor: 'var(--gray-5)',
            }}
          />
        </Inset>
        <Text as="p" size="3">
          <strong>Typography</strong> is the art and technique of arranging type to make written language legible,
          readable and appealing when displayed.
        </Text>
      </Card>
    </Box>
  );
};

const renderHeader = () => {
  return (
    <SegmentedControl.Root size="1" defaultValue="inbox">
      <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
      <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
      <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};

const renderFooter = () => {
  return (
    <Flex gap="2">
      <UploadIcon />
      <UpdateIcon />
    </Flex>
  );
};

export const Default = {
  props: {
    theme: {},
  },
  args: {
    children: (
      <>
        <BubbleList>
          <Bubble
            variant="shadow"
            placement="end"
            header="Typography"
            footer={renderFooter()}
            content="The goal of typography is to relate font size."
          />
          <Bubble variant="shadow" header={renderHeader()} content="The goal of typography is to relate font size." />
          <Bubble
            content="Hello"
            placement="end"
            variant="outlined"
            avatar={{ color: 'orange', variant: 'solid', fallback: <DashIcon /> }}
          />
          <Bubble
            variant="shadow"
            content="The goal of typography is to relate font size, line height, and line width
      in a proportional way that maximizes beauty and makes reading easier and
      more pleasant."
          />
          <Bubble
            content="Hello"
            placement="end"
            avatar={{ color: 'crimson', radius: 'full', fallback: <DashIcon /> }}
          />
          <Bubble content="Hello" loading avatar={{ color: 'crimson', radius: 'full' }} />
          <Bubble content="Hello" renderMessage={renderMessage} />
          <Bubble content="Hello" placement="end" avatar={false} />
          <Bubble content={renderContent()} variant="none" />
        </BubbleList>
        <Sender
          allowSpeech
          // header={renderHeader()}
          // actions={false}
          // actions={() => {
          //   return (
          //     <Flex gap="2">
          //       <UploadIcon />
          //       <UpdateIcon />
          //     </Flex>
          //   );
          // }}
          // footer={renderFooter()}
          onSubmit={(value) => {
            console.log('value', value);
          }}
        />
      </>
    ),
  },
};
