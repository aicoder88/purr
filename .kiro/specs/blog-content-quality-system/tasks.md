# Implementation Plan

- [x] 1. Implement ContentValidator class
  - Create validation utility with comprehensive checks for blog post data
  - Implement template variable detection using regex patterns
  - Implement HTML detection in excerpts
  - Implement length validation for title, excerpt, and content
  - Implement image URL validation
  - _Requirements: 1.3, 1.4, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 1.1 Write property test for template variable detection
  - **Property 1: No template variables in displayed content**
  - **Validates: Requirements 1.1, 1.2**

- [ ]* 1.2 Write property test for validation rules
  - **Property 17: Title length validation**
  - **Property 18: Excerpt length validation**
  - **Property 19: Content minimum length validation**
  - **Validates: Requirements 5.1, 5.2, 5.3**

- [x] 2. Enhance ContentStore with validation
  - Add ContentValidator integration to ContentStore
  - Update savePost method to validate before saving
  - Add error handling for malformed JSON files
  - Update getAllPosts to filter invalid posts
  - Add logging for validation failures
  - _Requirements: 1.3, 1.5, 7.3_

- [ ]* 2.1 Write property test for save validation
  - **Property 2: Content validation rejects template variables**
  - **Property 14: Save operation runs all validations**
  - **Validates: Requirements 1.3, 4.3**

- [ ]* 2.2 Write property test for filtering invalid posts
  - **Property 4: Invalid posts are excluded from listings**
  - **Property 24: Malformed posts don't break the index**
  - **Validates: Requirements 1.5, 7.1**

- [x] 3. Enhance AutomatedContentGenerator with validation
  - Add ContentValidator integration to generator
  - Implement retry logic for failed generation
  - Add validation of AI-generated content
  - Implement fallback for broken image URLs
  - Return structured validation reports
  - _Requirements: 1.4, 2.3, 4.1, 4.2, 4.5_

- [ ]* 3.1 Write property test for generator output validation
  - **Property 3: Generator output contains no template variables**
  - **Property 7: Generated posts have valid image URLs**
  - **Property 12: Generator validates all required fields**
  - **Validates: Requirements 1.4, 2.3, 4.1**

- [ ]* 3.2 Write property test for generator retry logic
  - **Property 13: Generator rejects content with template variables**
  - **Property 16: Generator returns validation report**
  - **Validates: Requirements 4.2, 4.5**

- [x] 4. Update blog index page with error handling
  - Enhance getStaticProps to filter invalid posts
  - Add error handling for post loading failures
  - Implement image fallback in post cards
  - Add error logging with context
  - Display user-friendly error messages when posts fail to load
  - _Requirements: 1.5, 2.2, 7.1, 7.2_

- [ ]* 4.1 Write property test for image fallback
  - **Property 6: Broken images use fallback**
  - **Property 25: Image load failures use fallback**
  - **Validates: Requirements 2.2, 7.2**

- [x] 5. Make blog post cards fully clickable
  - Wrap entire post card in Link component
  - Remove nested "Read more" link to avoid duplicate navigation
  - Add hover effects to entire card
  - Ensure keyboard accessibility
  - Test click handling across the card
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ]* 5.1 Write property test for clickable cards
  - **Property 9: Post cards are fully clickable**
  - **Property 10: Post cards are wrapped in links**
  - **Property 11: Post cards are keyboard accessible**
  - **Validates: Requirements 3.2, 3.3, 3.5**

- [x] 6. Implement BlogRepairUtility
  - Create repair utility class with scan and repair methods
  - Implement scanning logic to identify broken posts
  - Implement repair for posts with template variables
  - Implement repair for posts with broken images
  - Generate detailed repair reports
  - Add CLI interface for running repairs
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 6.1 Write property test for repair operations
  - **Property 21: Repair utility regenerates posts with template variables**
  - **Property 22: Repair utility fixes broken images**
  - **Property 23: Unrepairable posts are flagged**
  - **Validates: Requirements 6.2, 6.3, 6.5**

- [x] 7. Fix existing broken blog post
  - Identify and fix the "most-powerful-odor-absorber" post with template variables
  - Regenerate proper title and excerpt
  - Ensure featured image is valid
  - Verify the post displays correctly
  - _Requirements: 1.1, 1.2, 2.1_

- [x] 8. Add duplicate detection
  - Implement title similarity checking algorithm
  - Add duplicate check before saving new posts
  - Return specific error for duplicate posts
  - Add duplicate detection to repair utility
  - _Requirements: 8.1, 8.2_

- [ ]* 8.1 Write property test for duplicate detection
  - **Property 29: Duplicate detection identifies similar titles**
  - **Property 30: Duplicates prevent publication**
  - **Validates: Requirements 8.1, 8.2**

- [x] 9. Add content quality validation
  - Implement word count validation
  - Implement HTML structure validation
  - Implement SEO metadata optimization checks
  - Provide actionable feedback for quality failures
  - _Requirements: 8.3, 8.4, 8.5_

- [ ]* 9.1 Write property test for quality validation
  - **Property 31: Content quality validation**
  - **Property 32: SEO metadata is optimized**
  - **Property 33: Quality failures provide feedback**
  - **Validates: Requirements 8.3, 8.4, 8.5**

- [x] 10. Add comprehensive error logging
  - Implement structured logging for all validation failures
  - Add context to all error logs
  - Ensure generator failures are logged with details
  - Add logging to repair utility operations
  - _Requirements: 7.5_

- [ ]* 10.1 Write property test for error logging
  - **Property 27: Generator failures return errors**
  - **Property 28: Operations log errors with context**
  - **Validates: Requirements 7.4, 7.5**

- [x] 11. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Run repair utility on all existing posts
  - Execute BlogRepairUtility scan on content/blog/en
  - Review scan report for issues
  - Run automated repairs
  - Manually review any posts that couldn't be auto-repaired
  - Verify all posts display correctly on blog index
  - _Requirements: 6.1, 6.4_

- [x] 13. Update documentation
  - Document ContentValidator API and usage
  - Document BlogRepairUtility CLI commands
  - Add troubleshooting guide for common validation errors
  - Update blog system documentation with new validation rules
  - _Requirements: All_

- [x] 14. Final checkpoint - Verify production readiness
  - Ensure all tests pass, ask the user if questions arise.
