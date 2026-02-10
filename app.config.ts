import type { ConfigContext, ExpoConfig } from "expo/config";

const appJson = require("./app.json");

type AppEnv = "development" | "development-device" | "testing" | "production";

const env = (process.env.APP_VARIANT as AppEnv) ?? "development";
export default ({ config }: ConfigContext): ExpoConfig => {
  const base: ExpoConfig = { ...(appJson?.expo ?? {}), ...(config ?? {}) };

  const baseBundleId = base.ios?.bundleIdentifier ?? "com.telehealth.app";
  const basePackage = base.android?.package ?? "com.telehealth.app";

  let suffix = "";
  let nameSuffix = "";

  if (env === "development" || env === "development-device") {
    suffix = "dev";
    nameSuffix = " (Dev)";
  }

  if (env === "testing") {
    suffix = "test";
    nameSuffix = " (Test)";
  }

  // production → no suffix

  return {
    ...base,
    name: `${base.name ?? "tele-health"}${nameSuffix}`,
    ios: {
      ...base.ios,
      bundleIdentifier: suffix ? `${baseBundleId}.${suffix}` : baseBundleId,
    },
    android: {
      ...base.android,
      package: suffix ? `${basePackage}.${suffix}` : basePackage,
    },
    extra: {
      ...(base.extra ?? {}),
      appEnv: env,
    },
  };
};
