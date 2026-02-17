import { createContext, useContext } from 'react';

import { createStore } from 'zustand';
import { useStore } from 'zustand';

export const DEFAULT_CONFIG = {
  camera: { position: [0, 0, 20], fov: 35 },
  dpr: [1, 2],
  lights: {
    ambient: { intensity: 0.5 },
    point: { position: [10, 10, 10], intensity: 1 },
  },
  physics: {
    viewportRatio: 10,
    lerpSpeed: 0.1,
    rotationSpeed: 0.05,
  },
  environment: 'city',
  font: '/fonts/helvetiker_bold.typeface.json',
  color: '#ffffff',
  visuals: {
    scale: 1,
    isInitial: true,
    float: { speed: 1, rotationIntensity: 0.5, floatIntensity: 0.5 },
    text: { size: 0.6, height: 0.2, bevelEnabled: true },
    material: {
      thickness: 0.1,
      chromaticAberration: 0.05,
      samples: 4,
      resolution: 512,
    },
  },
};

// ─────────────────────────────────────────────
// [핵심 변경] create() → createStore()
//
// create()  : 전역 싱글톤 Hook을 반환 → 인스턴스 공유 불가
// createStore() : 순수 Store 인스턴스를 반환 → 각 컴포넌트가
//                 독립적인 스토어를 소유 가능
//
// 사용 측에서는 useStore(storeInstance, selector) 로 구독합니다.
// ─────────────────────────────────────────────
export const createLogoStore = (initialName = 'LOGO') =>
  createStore((set) => ({
    name: initialName,
    isActive: false,
    options: structuredClone(DEFAULT_CONFIG), // 참조 공유 방지

    // 중첩 객체를 안전하게 병합
    // 기존 setLogoState 시그니처를 그대로 유지합니다.
    setLogoState: (newState) =>
      set((state) => {
        const mergedOptions = newState.options
          ? {
              ...state.options,
              ...newState.options,
              visuals: {
                ...state.options.visuals,
                ...newState.options.visuals,
              },
              physics: {
                ...state.options.physics,
                ...newState.options.physics,
              },
            }
          : state.options;

        return {
          ...state,
          ...newState,
          options: mergedOptions,
        };
      }),

    resetLogo: () =>
      set({
        name: initialName,
        isActive: false,
        options: structuredClone(DEFAULT_CONFIG),
      }),
  }));

export const LogoStoreContext = createContext(null);

/**
 * useLogoStore
 * - 기존 zustand Hook과 동일한 DX를 제공합니다.
 * - logoStore(selector) → useLogoStore(selector) 로 이름만 바뀝니다.
 *
 * @example
 * const name = useLogoStore((s) => s.name);
 * const setLogoState = useLogoStore((s) => s.setLogoState);
 */
export const useLogoStore = (selector) => {
  const store = useContext(LogoStoreContext);

  if (!store) {
    throw new Error(
      'useLogoStore는 반드시 LogoStoreContext.Provider 하위에서 사용해야 합니다.\n' +
        'ThreeDLogoWrapper로 감싸져 있는지 확인해 주세요.',
    );
  }

  return useStore(store, selector);
};
