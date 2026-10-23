# PROMPT 1 — Install and Configure NativeWind in My Existing Expo Mobile App

## Objective

Set up NativeWind in my existing Expo + React Native + TypeScript mobile application so I can use Tailwind CSS utility classes to style the app.

**Read `plan.md` first and follow it strictly.** Treat it as the source of truth for the project’s architecture, requirements, and implementation sequence. Follow all applicable project instructions as well.

## 1. Inspect the existing project

Before making changes:

1. Read `plan.md` completely.
2. Identify the existing mobile application directory.
3. Inspect its `package.json`, Expo SDK version, React Native version, TypeScript configuration, Expo Router setup, and current styling system.
4. Check whether NativeWind and its required dependencies are already installed.
5. Inspect existing Babel, Metro, CSS, and application entry-point configuration.
6. Identify existing configuration and functionality that must be preserved.

Do not assume this is a fresh Expo project. Work with the existing application and follow the structure defined in `plan.md`.

## 2. Follow the official NativeWind documentation

Use the NativeWind installation documentation specified for this project:

https://www.nativewind.dev/v5/getting-started/installation

Follow the instructions appropriate to the NativeWind version and the actual Expo and React Native versions installed in the project.

Do not mix instructions from different NativeWind versions. If the documented setup is incompatible with the project's dependencies, investigate the compatibility issue and explain the safest supported approach before making major changes.

## 3. Install NativeWind

Install NativeWind and only the dependencies required by the applicable official installation guide.

Use Expo-compatible installation commands, such as `npx expo install`, where appropriate.

Avoid unnecessary package installations, unrelated dependency upgrades, or changes to the project's framework.

If an important version change is required, explain why before proceeding.

## 4. Configure NativeWind completely

Apply all configuration steps required by the official documentation and the existing project, including, where applicable:

- NativeWind and Tailwind CSS configuration.
- Global CSS creation or updates.
- Metro configuration.
- Babel configuration, if required by the installed version.
- TypeScript declarations.
- Global CSS imports in the correct application entry point.
- Any additional configuration required by the documented NativeWind version.

Adapt every change to the existing project structure. Since this project uses Expo Router, ensure the CSS is imported through the appropriate entry point.

Do not blindly overwrite existing configuration files. Preserve existing plugins, settings, aliases, and functionality while making the smallest necessary changes.

## 5. Preserve the existing application

This task is limited to NativeWind installation and configuration.

- Do not implement authentication or onboarding.
- Do not create the design system yet.
- Do not redesign or modify existing screens.
- Do not change navigation behavior.
- Do not modify Clerk, Stream, PostHog, or other service integrations.
- Do not overwrite existing application configuration without inspecting it.
- Do not perform unrelated refactoring.

Follow `plan.md` and complete only the work required for this first step. Do not move on to later features in the project plan.

## 6. Verify the setup

Do not stop after installing the package or editing configuration files.

1. Run appropriate project diagnostics.
2. Verify that Metro can load the configuration.
3. Check TypeScript compatibility.
4. Confirm that the global CSS is imported correctly.
5. Test NativeWind with a minimal styling example.
6. Launch the existing application using its current development workflow.
7. Verify that the NativeWind styles actually render in the simulator or available runtime.
8. Remove temporary test changes and confirm that the original UI remains unchanged.

If a simulator or required tool is unavailable, report the limitation honestly. Do not claim successful verification without actually performing it.

## 7. Final report

After completing the work, report:

- The NativeWind version installed or confirmed.
- Dependencies added or changed.
- Configuration files created or modified.
- Important decisions made to maintain compatibility.
- Commands executed and their results.
- Whether NativeWind styling was verified in a running application.
- Any remaining issues or manual steps.

## Execution rules

- Read and follow `plan.md` strictly.
- Follow applicable project instructions.
- Inspect before editing.
- Preserve existing architecture and functionality.
- Prefer minimal, reversible changes.
- Do not invent APIs or configuration options.
- Do not install unnecessary dependencies.
- Ask before making risky or destructive changes.
- Do not proceed to the next project feature until this step is verified.

**Definition of done:** NativeWind is correctly installed and configured for the existing Expo mobile app, its styling works in a real rendered test, and all unrelated application UI and functionality remain intact.
