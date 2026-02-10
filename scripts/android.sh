#!/usr/bin/env bash
set -euo pipefail

# Expo/Gradle require a working Java runtime. On macOS it's common to have
# Homebrew OpenJDK installed but not registered with the system Java wrappers,
# which makes `java` fail with: "Unable to locate a Java Runtime."
#
# This script makes the project runnable by wiring up JAVA_HOME from Homebrew
# OpenJDK 17 when needed.

if [[ -n "${JAVA_HOME:-}" ]] && [[ -x "${JAVA_HOME}/bin/java" ]]; then
  : # JAVA_HOME is already correctly set.
else
  if command -v brew >/dev/null 2>&1; then
    BREW_PREFIX="$(brew --prefix openjdk@17 2>/dev/null || true)"
    if [[ -n "${BREW_PREFIX}" ]] && [[ -x "${BREW_PREFIX}/libexec/openjdk.jdk/Contents/Home/bin/java" ]]; then
      export JAVA_HOME="${BREW_PREFIX}/libexec/openjdk.jdk/Contents/Home"
      export PATH="${BREW_PREFIX}/bin:${PATH}"
    fi
  fi
fi

if ! command -v java >/dev/null 2>&1; then
  echo "Java runtime not found." >&2
  echo "Install OpenJDK 17 (recommended): brew install openjdk@17" >&2
  echo "Or set JAVA_HOME to a valid JDK before running npm run android." >&2
  exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCAL_PROPERTIES="${PROJECT_ROOT}/android/local.properties"

# Ensure Android SDK location is discoverable by Gradle.
# Prefer existing ANDROID_SDK_ROOT/ANDROID_HOME, otherwise fall back to the
# default Android Studio path on macOS.
SDK_DIR="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-${HOME}/Library/Android/sdk}}"
if [[ -d "${SDK_DIR}" ]]; then
  export ANDROID_HOME="${SDK_DIR}"
  export ANDROID_SDK_ROOT="${SDK_DIR}"

  if [[ -d "${PROJECT_ROOT}/android" ]] && [[ ! -f "${LOCAL_PROPERTIES}" ]]; then
    printf "sdk.dir=%s\n" "${SDK_DIR}" > "${LOCAL_PROPERTIES}"
  fi
fi

exec npx expo run:android "$@"
