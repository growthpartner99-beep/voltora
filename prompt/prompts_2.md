# PROMPT 2 — Implement the App-Wide Design System Using NativeWind

## Objective

Implement the complete design system for my existing Expo + React Native mobile application using NativeWind, based on the attached design-theme image.

**Read `plan.md` first and follow it strictly.** Follow the project's established architecture, requirements, and implementation sequence.

## 1. Inspect the existing project

Before making changes:

1. Read `plan.md` and identify the requirements for this step.
2. Inspect the existing mobile application and its current NativeWind configuration.
3. Review the attached design-theme image carefully.
4. Inspect the existing assets folder, font files, global CSS, and styling utilities.
5. Identify existing components and configuration that should be reused.

Build on the NativeWind setup completed in Prompt 1. Do not reinstall or reconfigure it unnecessarily.

## 2. Analyze the design theme

Treat the attached design-theme image as the visual source of truth.

Extract the design specifications, including:

- Primary and secondary colors.
- Background and surface colors.
- Text colors and hierarchy.
- Typography, font families, weights, and sizes.
- Spacing and sizing conventions.
- Border styles and corner radii.
- Shadows and elevation.
- Button styles and interaction states.
- Input-field styles.
- Reusable UI patterns.
- Icon styles and illustration usage.

Do not invent a different visual identity or substitute a generic mobile-app design.

If a particular value cannot be determined precisely from the image, use a reasonable estimate and keep it consistent across the design system.

## 3. Create centralized design tokens

Implement reusable design tokens in an appropriate theme directory, following the structure established in `plan.md`.

Organize the tokens so that future screens can consistently use the same:

- Colors.
- Typography.
- Spacing.
- Border radii.
- Shadows.
- Component dimensions.
- Other design properties supported by the existing styling architecture.

Avoid scattering repeated color values and styling decisions throughout the application.

Use the correct NativeWind configuration and global CSS utilities for the installed version. Keep the design tokens easy to maintain and extend.

## 4. Configure typography and fonts

Inspect the project's existing assets for the fonts used in the reference design.

If the required fonts are available:

- Load them using the appropriate Expo font-loading approach.
- Configure the correct font weights.
- Integrate them into the design system.
- Ensure the fonts load correctly before the relevant UI is rendered.

Do not download unrelated fonts or introduce unnecessary dependencies. If a required font is missing, report that and use the closest suitable available alternative.

## 5. Build reusable styling utilities

Create the necessary global CSS utilities, theme configuration, and reusable styling conventions for future screens.

Ensure the design system supports consistent styling for elements such as:

- Headings and body text.
- Primary and secondary buttons.
- Input fields.
- Cards and surfaces.
- Screen backgrounds.
- Spacing and layout.
- Borders and shadows.

Use NativeWind utilities wherever appropriate, while preserving the project's existing architecture and avoiding unnecessary abstractions.

Do not build the onboarding, sign-in, sign-up, or home screens in this step unless `plan.md` explicitly requires otherwise.

## 6. Preserve existing functionality

- Do not modify authentication behavior.
- Do not change navigation.
- Do not modify Clerk, Stream, PostHog, or backend integrations.
- Do not redesign existing screens as part of this step.
- Do not delete or replace existing assets.
- Do not introduce unrelated dependencies.
- Preserve all working configuration from Prompt 1.

The goal is to establish the shared visual foundation for the screens that will be implemented in subsequent steps.

## 7. Verify the design system

After implementation:

1. Run the available project diagnostics.
2. Verify the NativeWind and global CSS configuration.
3. Confirm that the design tokens and styling utilities are usable.
4. Check font loading and TypeScript compatibility.
5. Create a minimal temporary preview or test component if needed.
6. Launch the application and inspect the rendered result.
7. Compare the preview against the attached design-theme image.
8. Correct obvious discrepancies and remove temporary test changes.

Do not claim the design system works unless you have verified it using the available tools.

## 8. Final report

Report:

- The design tokens and utilities created.
- The files created or modified.
- How fonts and global styling are configured.
- Whether the design system was successfully tested.
- Any missing assets or remaining visual differences.

## Strict execution rules

- Follow `plan.md` strictly.
- Inspect before editing.
- Build on the existing NativeWind installation.
- Keep changes focused on the design system.
- Preserve existing functionality.
- Do not invent missing assets or claim unverified results.
- Do not proceed to Prompt 3 until this step is complete.

**Definition of done:** The application has a centralized, reusable NativeWind design system that closely follows the attached design theme and is ready for the onboarding and authentication screens in later steps.
