import { getUserOrganizations, getRecentUserActivity } from '@/shared/api/data';

import { ActivityLog } from './ActivityLog';
import { OrganizationLinks } from './OrganizationLinks';
import { formatActivitySummary } from '../lib/format-activity';

export const ProfileActivity = async ({ username }) => {
  const [orgResponse, recentUserActivity] = await Promise.all([
    getUserOrganizations(username),
    getRecentUserActivity(username),
  ]);

  const organizations = orgResponse.data.user?.organizations.nodes;
  const activitySummaryString = formatActivitySummary(recentUserActivity);

  return (
    // 💡 하나의 그룹으로 묶어 간격을 미세하게 조정 (gap-2 ~ 3)
    <div className="flex w-full flex-col items-center">
      {/* 조직 링크 (상단) */}
      {organizations && organizations.length > 0 && (
        <div className="flex w-full justify-center opacity-80 transition-opacity hover:opacity-100">
          <OrganizationLinks organizations={organizations} />
        </div>
      )}

      {/* 활동 로그 (하단) */}
      <div className="flex w-full justify-center">
        <ActivityLog message={activitySummaryString} />
      </div>
    </div>
  );
};
