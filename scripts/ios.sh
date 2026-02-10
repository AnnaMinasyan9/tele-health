#!/usr/bin/env bash
set -euo pipefail

# React Native (RN 0.81 / Expo SDK 54) requires a newer Xcode than older setups.
# If `pod install` fails with "Please upgrade XCode", it's coming from RN's
# CocoaPods scripts enforcing a minimum Xcode version.

MIN_XCODE_VERSION="16.1"

version_ge() {
  # Returns 0 if $1 >= $2
  local a b c x y z
  IFS='.' read -r a b c <<<"${1}"; c="${c:-0}"
  IFS='.' read -r x y z <<<"${2}"; z="${z:-0}"
  (( a > x )) && return 0
  (( a < x )) && return 1
  (( b > y )) && return 0
  (( b < y )) && return 1
  (( c >= z )) && return 0 || return 1
}

if ! command -v xcodebuild >/dev/null 2>&1; then
  echo "Xcode command line tools not found (missing xcodebuild)." >&2
  echo "Install Xcode >= ${MIN_XCODE_VERSION} and select it via xcode-select." >&2
  exit 1
fi

XCODE_VERSION_LINE="$(xcodebuild -version 2>/dev/null | head -n 1 || true)"
XCODE_VERSION="$(echo "${XCODE_VERSION_LINE}" | awk '{print $2}' || true)"

if [[ -z "${XCODE_VERSION}" ]]; then
  echo "Could not determine Xcode version from: ${XCODE_VERSION_LINE}" >&2
  exit 1
fi

if ! version_ge "${XCODE_VERSION}" "${MIN_XCODE_VERSION}"; then
  echo "React Native requires Xcode >= ${MIN_XCODE_VERSION}. Found ${XCODE_VERSION}." >&2
  echo "Upgrade Xcode, then run:" >&2
  echo "  sudo xcodebuild -license accept" >&2
  echo "  sudo xcodebuild -runFirstLaunch" >&2
  exit 1
fi

if ! command -v pod >/dev/null 2>&1; then
  echo "CocoaPods not found (missing 'pod'). Install it, e.g.:" >&2
  echo "  sudo gem install cocoapods" >&2
  exit 1
fi

exec npx expo run:ios "$@"
