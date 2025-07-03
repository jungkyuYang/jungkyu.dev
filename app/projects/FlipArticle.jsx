import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { GoDependabot, GoEye, GoEyeClosed, GoStar } from "react-icons/go";
import { VercelInfo } from "../_components/vercel-info";
import { getTrafficPageViews, getDependabotAlerts } from "../_service/data";
import CardFlipContainer from "../_components/CardFlipContainer";
import CardBackButtons from "../_components/CardBackButtons";
import * as CONSTANTS from "../_constants";
import TechStackCarousel from "../_components/TechStackCarousel";

export const FlipArticle = async ({ project }) => {
  const appLink = project.homepage ? project.homepage : project.html_url;

  /** Repository visitors info. */
  let views = (
    <span
      title="Can't get traffic data for someone else's repo."
      className="flex items-center gap-1"
    >
      <GoEyeClosed className="w-4 h-4" />
    </span>
  );
  let alerts = (
    <span title="Can't get alerts data for someone else's repo.">
      <GoDependabot className="w-4 h-4" />
    </span>
  );
  const isGitHubUser = process.env.GITHUB_USERNAME === project.owner.login;
  if (isGitHubUser) {
    const [{ todayUniques, sumUniques } = {}, openAlertsBySeverity] =
      await Promise.all([
        getTrafficPageViews(project.owner.login, project.name),
        getDependabotAlerts(project.owner.login, project.name),
      ]);
    views = (
      <span
        title="Unique repository visitors: Last 14 days / Today."
        className="flex items-center gap-1"
      >
        <GoEye className="w-4 h-4" />{" "}
        {Intl.NumberFormat("en-US", { notation: "compact" }).format(sumUniques)}
        /
        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
          todayUniques
        )}
      </span>
    );

    const alertColor =
      openAlertsBySeverity.critical > 0
        ? "red"
        : openAlertsBySeverity.high > 0
        ? "orange"
        : openAlertsBySeverity.medium > 0
        ? "yellow"
        : openAlertsBySeverity.low > 0
        ? "blue"
        : "gray";
    const alertCountTotal =
      (openAlertsBySeverity.critical || 0) +
      (openAlertsBySeverity.high || 0) +
      (openAlertsBySeverity.medium || 0) +
      (openAlertsBySeverity.low || 0);
    const alertTitle =
      alertCountTotal > 0
        ? `Open Dependabot alerts: ` + JSON.stringify(openAlertsBySeverity)
        : "No open Dependabot alerts.";

    alerts = (
      <span title={alertTitle} className="flex items-center gap-1">
        <GoDependabot className="w-4 h-4 danger" fill={alertColor} />{" "}
        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
          alertCountTotal
        )}
      </span>
    );
  }

  // 카드 뒷면 버튼 배열 생성
  const buttons = [
    project.homepage && {
      label: "배포 사이트 바로가기",
      url: project.homepage,
      type: "external",
    },
    project.html_url && {
      label: "깃허브 레포 바로가기",
      url: project.html_url,
      type: "external",
    },
    {
      label: "자세히 보기",
      url: `/projects/${project.name}`,
      type: "internal",
    },
  ].filter(Boolean);

  return (
    <CardFlipContainer
      front={
        <article className="effect-glow p-4 md:p-8 flex flex-col justify-center items-center h-full">
          <span className="effect-glow-bar" />
          <div className="w-full">
            <div className="flex justify-between gap-2 items-center w-full">
              <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                <time
                  dateTime={
                    project.customCreatedAt
                      ? project.customCreatedAt
                      : new Date(project.created_at).toISOString()
                  }
                  title="프로젝트 시작일"
                >
                  {(project.customCreatedAt
                    ? project.customCreatedAt
                    : new Date(project.created_at)
                        .toISOString()
                        .substring(0, 10)
                  ).replace(/-/g, ".")}
                </time>
                <span className="mx-1">~</span>
                <time
                  dateTime={
                    project.customUpdatedAt
                      ? project.customUpdatedAt
                      : new Date(project.updated_at).toISOString()
                  }
                  title="프로젝트 종료일(마지막 수정일)"
                >
                  {(project.customUpdatedAt
                    ? project.customUpdatedAt
                    : new Date(project.updated_at)
                        .toISOString()
                        .substring(0, 10)
                  ).replace(/-/g, ".")}
                </time>
              </span>
              <span className="text-zinc-500 text-xs flex items-center gap-1 ">
                {project.vercel && (
                  <VercelInfo
                    info={{ ...project.vercel, owner: project.owner }}
                  />
                )}
                <span title="Total stars." className="flex items-center gap-1">
                  <GoStar className="w-4 h-4" />{" "}
                  {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                    project.stargazers_count
                  )}
                </span>
              </span>
            </div>

            <h2
              className="project-card-title z-20 text-2xl font-bold leading-tight duration-1000 lg:text-3xl text-white font-display cursor-pointer line-clamp-2 min-h-[2.6em] max-h-[2.6em] break-keep overflow-hidden"
              title={`Click to view the ${project.homepage ? "app" : "repo"}.`}
            >
              <span>{project.title ?? project.name}</span>
            </h2>
            <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200 line-clamp-5 min-h-[6.5rem] max-h-[6.5rem]">
              {project.customDescription ?? project.description}
            </p>
            {project.techStack && project.techStack.length > 0 && (
              <TechStackCarousel
                techStack={project.techStack}
                techIcons={CONSTANTS.TECH_ICONS}
              />
            )}
            <div className="flex justify-between items-center w-full mt-2 border-t-2 border-gray-700 border-opacity-50">
              <span className="text-zinc-500 text-xs flex items-center gap-1">
                {views} {alerts}
              </span>
              <span
                className="text-zinc-500 text-xs align-middle flex items-center gap-1"
                title="GitHub repository link."
              >
                <FaGithub className="w-4 h-4" />
                <Link href={project.html_url} className="hover:text-blue-800">
                  {project.name}
                </Link>
              </span>
            </div>
          </div>
        </article>
      }
      back={<CardBackButtons buttons={buttons} />}
    />
  );
};
