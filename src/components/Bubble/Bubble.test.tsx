import { render, screen } from '@testing-library/react';
import { Bubble } from './Bubble';

describe('Bubble Component', () => {
  test('正确渲染AI气泡', () => {
    render(<Bubble message="测试消息" isAI />);
    expect(screen.getByText('测试消息')).toHaveClass('ai-bubble');
  });

  test('显示时间戳', () => {
    const testDate = new Date('2024-01-01T12:00:00');
    render(<Bubble message="测试" timestamp={testDate} />);
    expect(screen.getByText('12:00:00')).toBeInTheDocument();
  });

  test('错误状态显示重试按钮', () => {
    render(<Bubble message="错误消息" status="error" />);
    expect(screen.getByRole('button', { name: /重试/i })).toBeInTheDocument();
  });
}); 