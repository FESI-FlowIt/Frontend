// 'use client';

// import { useEffect, useState } from 'react';
// import GoalListDashboardCard from './GoalListDashboardCard';
// import { GoalSummary } from '@/interfaces/goalInterface';
// import { useGoals } from '@/hooks/useGoals';

// export default function GoalListDashboard() {
//   const { data: goals = [] } = useGoals() as { data: GoalSummary[] };

//   const displayedGoals = goals
//     .sort((a, b) => {
//       if (a.isPinned === b.isPinned) {
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       }
//       return a.isPinned ? -1 : 1;
//     })
//     .slice(0, 3);

//   return (
//     <div className="flex h-[440px] w-[1504px] flex-col gap-4 bg-gray-50 p-4">
//       <div className="flex h-[32px] w-[1472px] items-center justify-between">
//         <h2 className="text-text-01 text-body-sb-20">목표 별 할 일</h2>
//         <button className="text-body-sb-20 text-text-03">모든 목표 보기</button>
//       </div>

//       <section className="grid h-[408px] auto-cols-max grid-flow-col gap-4">
//         {goals.length === 0 ? (
//           <GoalListDashboardCard goal={null} />
//         ) : (
//           <>
//             {displayedGoals.map(goal => (
//               <GoalListDashboardCard key={goal.goalId} goal={goal} />
//             ))}
//           </>
//         )}
//       </section>
//     </div>
//   );
// }
