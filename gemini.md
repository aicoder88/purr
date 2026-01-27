# Purrify Development & Content Generation Guidelines

This document serves as a persistent memory and guide for future development and content generation tasks, specifically for the "Purrify" project.

## Blog Post & Content Visuals

### Aesthetic Direction
*   **Primary Style**: **Studio Ghibli / Anime Aesthetic**.
*   **Keywords for Prompts**: "Studio Ghibli style", "sparkling clean", "magical atmosphere", "detailed background", "bright", "cute cat", "incredible".
*   **Vibe**: Premium, charming, clean, magical, inviting. Avoid generic, sterile stock photography where possible.

### Image Technical Standards
*   **Responsive Classes**: All inline images within blog post content (JSON `content` fields) WITHOUT EXCEPTION must use the following Tailwind CSS classes to ensure they look premium and don't overwhelm the reader on desktop:
    ```html
    class="w-full md:w-3/4 mx-auto rounded-xl shadow-lg"
    ```
    *   *Rationale*: Prevents full-width "walls of image" on large screens while maintaining mobile responsiveness (`w-full`).
*   **File Location**: Store optimized blog images in `/public/optimized/blog/`.
*   **Naming Convention**: Descriptive, kebab-case, with `-ghibli` suffix if generated in that style (e.g., `sparkling-clean-home-ghibli.png`).

### Content Workflow
1.  **Identify Visual Gaps**: Scan content for "walls of text" or sections that need visual explanation (e.g., "Myth vs Fact", comparisons, complex concepts).
2.  **Generate Custom Art**: Use the Ghibli-style prompt strategy to create specific, relevant illustrations for those sections.
3.  **Insert & Optimize**:
    *   Insert `<img>` tags directly into the HTML string in the JSON file.
    *   Structure:
        ```html
        <figure class="my-8">
          <img src="/optimized/blog/your-image-ghibli.png" alt="Descriptive Alt Text" class="w-full md:w-3/4 mx-auto rounded-xl shadow-lg" width="800" height="450" />
          <figcaption class="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">Optional caption explaining the visual</figcaption>
        </figure>
        ```
4.  **Metadata**: Ensure the `featuredImage` and `seo.ogImage` fields in the JSON file are updated to point to the new, high-quality hero image if replaced.

## General Coding Expectations
*   **Absolute Paths**: Always use absolute paths for file operations.
*   **Dependencies**: Check `package.json` before installing new packages; prefer `npx` for one-off commands.
*   **Linting**: Respect existing linting rules; fix errors immediately if introduced.
