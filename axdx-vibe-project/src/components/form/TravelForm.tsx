import React, { useState } from 'react';

interface TravelFormProps {
  onSubmit: (data: { destination: string; schedule: string; concept: string }) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [schedule, setSchedule] = useState('');
  const [concept, setConcept] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // AC-03: 목적지 검증
    if (!destination.trim()) {
      setError('목적지를 선택해주세요');
      return;
    }
    // AC-04: 일정 검증
    if (!schedule.trim()) {
      setError('여행 일정을 선택해주세요');
      return;
    }
    // AC-05: 여행 컨셉 검증
    if (!concept.trim()) {
      setError('여행 컨셉을 선택해주세요');
      return;
    }

    // 검증 통과 시 상위 컴포넌트로 데이터 전달
    onSubmit({ destination, schedule, concept });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="destination" className="block mb-1 text-sm font-semibold text-gray-700">목적지</label>
        <input
          id="destination"
          aria-label="목적지"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="예: 제주도"
        />
      </div>
      
      <div>
        <label htmlFor="schedule" className="block mb-1 text-sm font-semibold text-gray-700">일정</label>
        <input
          id="schedule"
          aria-label="일정"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="예: 2박 3일"
        />
      </div>

      <div>
        <label htmlFor="concept" className="block mb-1 text-sm font-semibold text-gray-700">여행 컨셉</label>
        <input
          id="concept"
          aria-label="여행 컨셉"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="예: 힐링, 미식"
        />
      </div>

      {/* 유효성 검사 에러 메시지 출력 영역 */}
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <button 
        type="submit" 
        className="w-full p-3 mt-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"