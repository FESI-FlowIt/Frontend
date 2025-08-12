'use client';

import TotalTimeDisplay from './TotalTimerDisplay';

interface Props {
  serverTotalTime: string;
}

export default function TotalTime({ serverTotalTime }: Props) {
  const [h = '00', m = '00', s = '00'] = (serverTotalTime ?? '00:00:00').split(':');
  return <TotalTimeDisplay totalH={h} totalM={m} totalS={s} />;
}
