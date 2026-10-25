# Task: Recreate the DentalCare Onboarding Screen from the Reference Image

You are working on my existing dental clinic application. I have attached a reference image of the onboarding screen I want you to recreate.

Your task is to implement the screen in my existing application and iteratively compare screenshots until the implementation closely matches the reference.

**This is a dental clinic application, NOT a Duolingo clone or language-learning application.**

## 1. Read the project instructions and inspect the application

Before changing anything:

1. Read `plan.md`, `AGENTS.md`, and all applicable project instructions.
2. Inspect the existing project structure, navigation, onboarding flow, components, dependencies, and design conventions.
3. Identify the correct screen and route for the first onboarding step.
4. Inspect the existing Clerk authentication and session handling.
5. Identify how the application runs on the Android emulator or connected device.
6. Determine which screenshot and image-inspection tools are available.

Do not create a new project or replace the existing application architecture.

Preserve working authentication, including the Expo Go Google sign-in redirect fix and `src/app/sso-callback.tsx`.

## 2. Recreate the reference design

Use the attached image as the primary visual source of truth.

The screen should reproduce these elements:

### Overall appearance

- A premium, clean dental-care aesthetic.
- A pale icy-blue and white background.
- Glassmorphism with translucent surfaces, soft highlights, subtle borders, and realistic soft shadows.
- Dark navy typography and bright cyan/turquoise accents.
- A polished mobile layout with rounded corners and carefully controlled spacing.
- Floating translucent bubbles and subtle decorative sparkles around the background.
- The DentaCare brand heading and the subtitle "Care for your smile".
- A top status-bar area that respects the device's safe area.
- A large, rounded, translucent onboarding card.

### Progress indicator

- Display "1 of 4".
- Show a horizontal four-part progress indicator.
- Highlight the first segment in cyan/turquoise.
- Keep the remaining three segments pale blue.

### Heading and description

- Heading: "Tell us about you"
- Description: "We'll create your personal profile."

Match the reference's font size, weight, color, alignment, and spacing as closely as possible.

### Form fields

Implement the following fields in the same order:

1. First name
   - Placeholder: "Enter your first name"

2. Last name
   - Placeholder: "Enter your last name"

3. Date of birth
   - Placeholder: "MM / DD / YYYY"
   - Include a calendar icon.
   - Use an appropriate date picker if the existing project supports one.

4. Phone number
   - Include a country selector with a flag and dialing code.
   - Match the reference's divider and input layout.
   - Use a suitable phone-input solution if one is already available.

5. Gender
   - Three horizontally arranged choices: Male, Female, Other.
   - The reference shows Male selected, but selection must work correctly.

### Continue button

- Large, rounded cyan/turquoise gradient-style button.
- White "Continue" text.
- Soft blue shadow or glow.
- Match the reference's dimensions, position, typography, and corner radius.

The screenshot's selected gender and empty fields are reference states, not permanent hard-coded values.

## 3. Preserve functionality and application conventions

- Use the project's existing Expo React Native and Expo Router architecture.
- Reuse existing components and dependencies where appropriate.
- Do not add dependencies unless they are genuinely needed.
- All form fields must be interactive and keyboard-accessible.
- Validate required fields and reasonable input formats.
- Make the Continue button advance to the
