export const formatActivitySummary = (recentUserActivity) => {
  if (!recentUserActivity || recentUserActivity.length === 0) return null;

  const activitySummary = recentUserActivity.reduce((acc, activity) => {
    if (activity.type === 'PushEvent') {
      acc.commits = (acc.commits || 0) + (activity.payload.size || 0);
    } else if (activity.type === 'PullRequestReviewEvent') {
      acc.reviews = (acc.reviews || 0) + 1;
    } else if (activity.type === 'IssueCommentEvent') {
      if (activity.payload.action === 'created') {
        acc.commentsCreated = (acc.commentsCreated || 0) + 1;
      } else if (activity.payload.action === 'edited') {
        acc.commentsEdited = (acc.commentsEdited || 0) + 1;
      }
    } else if (activity.type === 'PullRequestEvent') {
      if (activity.payload.action === 'opened') {
        acc.prsOpened = (acc.prsOpened || 0) + 1;
      } else if (activity.payload.action === 'closed' && activity.payload.pull_request.merged) {
        acc.prsMerged = (acc.prsMerged || 0) + 1;
      }
    } else if (activity.type === 'CreateEvent') {
      if (activity.payload.ref_type === 'tag') {
        acc.tags = (acc.tags || 0) + 1;
      } else {
        acc.branches = (acc.branches || 0) + 1;
      }
    }

    return acc;
  }, {});

  const activitySummaryString = Object.keys(activitySummary)
    .map((key) => {
      const value = activitySummary[key];
      if (key === 'commits' && value) {
        return `pushed ${value} commit${value === 1 ? '' : 's'}`;
      } else if (key === 'reviews' && value) {
        return `reviewed ${value} PR${value === 1 ? '' : 's'}`;
      } else if (key === 'prsOpened' && value) {
        return `opened ${value} PR${value === 1 ? '' : 's'}`;
      } else if (key === 'prsMerged' && value) {
        return `merged ${value} PR${value === 1 ? '' : 's'}`;
      } else if (key === 'commentsCreated' && value) {
        return `made ${value} comment${value === 1 ? '' : 's'}`;
      } else if (key === 'branches' && value) {
        return `created ${value} branch${value === 1 ? '' : 'es'}`;
      } else if (key === 'tags' && value) {
        return `created ${value} tag${value === 1 ? '' : 's'}`;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');

  return activitySummaryString;
};
