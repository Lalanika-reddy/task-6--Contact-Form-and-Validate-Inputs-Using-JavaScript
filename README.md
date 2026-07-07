# Task 6: Premium Contact Form with JavaScript Validation

A premium, responsive, and highly interactive contact form built using semantic **HTML5**, modern **CSS3**, and **Vanilla JavaScript**. 

The user interface features a futuristic dark glassmorphism theme designed to align with the **Antigravity OS** design system, complete with background parallax highlights and robust client-side validation logic.

## Project Structure

```text
task-6/
├── README.md   - Project documentation (this file)
├── index.html  - Form structure, fields, and success views
├── style.css   - Glassmorphic CSS variables, layouts, and animations
└── app.js      - Input validation, email regex, and micro-interactions
```

---

## Features

### 1. Robust JavaScript Validation
*   **Real-time feedback**: Inputs clear their error states immediately as soon as the user corrects their entry.
*   **Blur Event triggers**: Fields validate automatically when the user tabs away (loses focus), helping catch issues early.
*   **Strict constraints**:
    *   **Full Name**: Non-empty, minimum length of 2 characters.
    *   **Email**: Non-empty, verified against a strict RFC 5322 regex pattern (`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`).
    *   **Message**: Non-empty, minimum length of 10 characters.
*   **Error Prevention**: Form submission is blocked if any field fails validation.

### 2. High-Fidelity UI & Interactions
*   **Interactive Spatial Background**: Two glowing color orbs (cyan and purple) follow your mouse movement across the background using a smooth parallax effect.
*   **Floating Labels**: Input labels transition smoothly to the top-left on focus or when input is present.
*   **Glow borders**: Focus elements light up with gradients matching the branding.
*   **Failure shake animation**: Submitting invalid data triggers a quick CSS shake animation on the card to alert the user.
*   **Submitting transition**: Simulates network request latency (1.5 seconds) with a spinning loader inside the button.
*   **Animated checkmark success**: Features a custom path animation drawing a green success checkmark upon valid submission, accompanied by a personalized greeting message.

---

## How to Run Locally

### Method 1: Python HTTP Server (Already active on Port 8000)
Run this command from your workspace directory:
```bash
python -m http.server 8000
```
Then navigate to:
[http://localhost:8000/task-6/index.html](http://localhost:8000/task-6/index.html)

### Method 2: Node JS (http-server / live-server)
Run either of these commands:
```bash
npx live-server
# or
npx http-server
```

---

## Verification Test Cases

To verify all aspects of validation, perform these test cases on the form:

1.  **Empty Submit**: Click `Send Message` on an empty form. Verify that all fields display red error borders/messages and the card plays a shake animation.
2.  **Short Name**: Enter a single letter in Name, click away. Verify error `Name must be at least 2 characters.` appears. Verify it disappears once you type a second character.
3.  **Invalid Email**: Enter `john` or `john@domain` or `@domain.com`. Verify error `Please enter a valid email (e.g., name@example.com).` appears.
4.  **Short Message**: Enter `Hi there` (8 characters). Verify error counter shows `Message must be at least 10 characters (currently: 8).`
5.  **Success Submission**: Fill in valid data (e.g., Name: `Antigravity Dev`, Email: `dev@antigravity.space`, Message: `Awesome spatial platform setup!`). Click `Send Message`. Watch the button transition into a loading spinner and then load the success view with the custom greeting.
