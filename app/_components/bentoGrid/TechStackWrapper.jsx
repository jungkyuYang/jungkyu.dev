import data from "../../../data.json";
import { getTechIconUrl } from "../../_services/utils";
import { TechStack } from "./TechStack";

export const TechStackWrapper = () => {
  const { main, libraries } = data.techStacks;

  // 1. 메인 스택에 아이콘 URL 주입 (가공이 아닌 서비스 결합)
  const mainWithIcons = main.map(item => ({
    ...item,
    icon: getTechIconUrl(item.name)
  }));

  // 2. 라이브러리 데이터는 그대로 유지 (필요 시 여기서도 가공 가능)
  // 유저님 철학대로라면 여기서 복잡한 비즈니스 로직은 생략!
  
  return <TechStack mainItems={mainWithIcons} libraries={libraries} />;
};