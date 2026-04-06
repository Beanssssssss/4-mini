import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 루트에 lockfile이 여러 개 존재할 때 Next가 잘못된 디렉토리를 루트로 추정하는 문제를 방지합니다.
  // (이 설정이 없으면 `/Users/kjb/package-lock.json`을 기준으로 잡는 경고가 뜹니다.)
  turbopack: {
    root: __dirname,
  },
  /* config options here */
};

export default nextConfig;
