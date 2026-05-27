import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
// 아직 컴포넌트가 존재하지 않지만, 구현할 경로를 미리 지정합니다.
import TravelForm from '../components/form/TravelForm';

describe('TravelForm 유효성 검사 테스트 (High Priority AC)', () => {
  
  it('AC-03: 목적지를 선택하지 않은 상태에서 코스 생성 클릭 시 안내 메시지 표시 및 진행 차단', () => {
    const mockOnSubmit = vi.fn();
    render(<TravelForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: '코스 생성' });
    fireEvent.click(submitButton);

    expect(screen.getByText('목적지를 선택해주세요')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('AC-04: 일정을 선택하지 않은 상태에서 코스 생성 클릭 시 안내 메시지 표시 및 진행 차단', () => {
    const mockOnSubmit = vi.fn();
    render(<TravelForm onSubmit={mockOnSubmit} />);

    // 목적지만 입력된 상황을 시뮬레이션
    const destinationInput = screen.getByLabelText('목적지');
    fireEvent.change(destinationInput, { target: { value: '제주도' } });

    const submitButton = screen.getByRole('button', { name: '코스 생성' });
    fireEvent.click(submitButton);

    expect(screen.getByText('여행 일정을 선택해주세요')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('AC-05: 여행 컨셉을 선택하지 않은 상태에서 코스 생성 클릭 시 안내 메시지 표시 및 진행 차단', () => {
    const mockOnSubmit = vi.fn();
    render(<TravelForm onSubmit={mockOnSubmit} />);

    // 목적지와 일정이 입력된 상황을 시뮬레이션
    const destinationInput = screen.getByLabelText('목적지');
    fireEvent.change(destinationInput, { target: { value: '제주도' } });
    
    const scheduleInput = screen.getByLabelText('일정');
    fireEvent.change(scheduleInput, { target: { value: '2박 3일' } });

    const submitButton = screen.getByRole('button', { name: '코스 생성' });
    fireEvent.click(submitButton);

    expect(screen.getByText('여행 컨셉을 선택해주세요')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});