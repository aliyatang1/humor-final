# Combined Test Plan: Humor Feed Full Application

## Deployment Target

- Production URL: https://humor-final.vercel.app/login
- Application stack: Next.js 16.1.6, React 19, TypeScript, Supabase SSR, Tailwind CSS
- Scope: Project 1 gallery and voting, Project 2 admin panel, Project 3 prompt-chain humor flavor system

## Application Route Tree

```text
Humor Feed
├── Public and authentication routes
│   ├── /login
│   └── /auth/callback
├── Authenticated user routes
│   ├── /
│   ├── /upload
│   └── /logout
└── Superadmin routes
    ├── /admin
    ├── /admin/users
    ├── /admin/images
    ├── /admin/captions
    ├── /admin/humor-flavors
    ├── /admin/humor-flavors/create-test
    └── /admin/llm-prompt-chains
```

The production build validates 14 compiled Next.js routes/pages, including framework-generated route outputs and the application routes above.

## Logical User Pathways

### Pathway 1: Authentication and Session Entry

Purpose: Verify users enter the system securely and only reach routes allowed by their authentication state.

Scenarios:

1. Unauthenticated user opens `/login`.
2. Login page displays Google OAuth entry point.
3. User starts Google OAuth flow.
4. Supabase exchanges OAuth callback code at `/auth/callback`.
5. Authenticated session is created.
6. User is redirected into the application.
7. Session persists across refresh.
8. Logout clears session through `/logout`.
9. Logged-out user returns to `/login`.
10. Unauthenticated access to `/` redirects to `/login`.
11. Unauthenticated access to `/upload` redirects to `/login`.
12. Unauthenticated access to `/admin` redirects to `/login`.
13. Non-superadmin authenticated user is blocked from `/admin`.
14. Superadmin user is allowed into `/admin`.

Project coverage: P1 authentication, P2 superadmin authorization, P3 admin-only prompt tooling access.

### Pathway 2: Gallery Browsing and Voting

Purpose: Verify the primary user experience for viewing images, reading captions, and voting.

Scenarios:

1. Authenticated user reaches `/`.
2. Public images load from Supabase.
3. Captions appear under each image.
4. Gallery supports newest sorting.
5. Gallery supports hot sorting.
6. Responsive grid renders on mobile, tablet, and desktop.
7. Upvote button records a positive vote.
8. Downvote button records a negative vote.
9. Vote upsert prevents duplicate vote records.
10. Vote state persists after refresh.
11. Vote counts appear in admin analytics.
12. User-friendly errors appear when vote mutation fails.
13. Header navigation exposes upload, logout, and admin links as appropriate.
14. Dark mode and theme provider do not break layout.

Project coverage: P1 gallery/voting, P2 analytics integration, P3 generated caption display.

### Pathway 3: User Upload and Caption Generation

Purpose: Verify the user-facing content submission workflow and its integration with LLM-generated captions.

Scenarios:

1. Authenticated user opens `/upload`.
2. Upload page renders with clear form controls.
3. User submits an image.
4. Upload validates required fields.
5. Image record is created in Supabase.
6. Caption generation pipeline starts.
7. Humor flavor prompt chains are selected.
8. LLM responses are received.
9. Generated captions are stored.
10. Captions link to the correct image.
11. New image appears in the gallery when public.
12. Upload failures show user-facing errors.
13. Progress and loading states prevent double submission.
14. Generated content remains visible after refresh.

Project coverage: P1 upload/gallery, P3 prompt chain execution, P2 admin visibility of generated content.

### Pathway 4: Admin Dashboard and Analytics

Purpose: Verify the superadmin control center displays accurate system state.

Scenarios:

1. Superadmin opens `/admin`.
2. Dashboard loads after auth verification.
3. Total users metric displays.
4. Total images metric displays.
5. Total captions metric displays.
6. All-time votes metric displays.
7. Weekly votes metric displays.
8. Active voters metric displays.
9. Average captions per image is calculated.
10. Caption rating distribution appears.
11. Upvote percentage appears.
12. Trending captions appear.
13. Top voted captions appear.
14. Navigation links reach all admin sections.
15. Non-superadmin cannot access dashboard data.

Project coverage: P2 dashboard, P1 voting data, P3 generated caption analytics.

### Pathway 5: Admin User Management

Purpose: Verify superadmins can inspect and manage users safely.

Scenarios:

1. Superadmin opens `/admin/users`.
2. Profiles load from Supabase.
3. User email displays.
4. Superadmin status displays.
5. Creation date displays.
6. Users are sorted by creation date.
7. Superadmin flag can be toggled.
8. Updated role persists after refresh.
9. User delete confirmation appears.
10. Deleted user is removed from list.
11. Related records remain consistent.
12. Errors are displayed when update/delete fails.

Project coverage: P2 user CRUD and permission management.

### Pathway 6: Admin Image Management

Purpose: Verify image records can be created, searched, updated, and deleted.

Scenarios:

1. Superadmin opens `/admin/images`.
2. Images load with URL, public status, creation date, and caption count.
3. Admin uploads an image URL.
4. Admin chooses public/private visibility.
5. New image appears in image table.
6. Public/private status can be toggled.
7. Visibility affects gallery display.
8. Image search filters by ID.
9. Image search filters by URL.
10. Delete confirmation appears.
11. Deleting image cascades to captions.
12. Deleting image cascades to votes.
13. UI reports success and failure states.
14. Table remains stable with many records.

Project coverage: P2 image CRUD, P1 gallery visibility, P3 caption relationships.

### Pathway 7: Admin Caption Management

Purpose: Verify caption CRUD and engagement analytics.

Scenarios:

1. Superadmin opens `/admin/captions`.
2. Captions load with content and image IDs.
3. Upvote/downvote counts are calculated.
4. Caption engagement metrics render.
5. Caption rating distribution renders.
6. Admin creates a manual caption.
7. New caption appears in list.
8. Admin edits caption content.
9. Edits persist after refresh.
10. Admin deletes caption.
11. Deleting caption cascades to votes.
12. Pagination remains stable.
13. Caption updates appear in gallery.
14. Errors are shown clearly.

Project coverage: P2 caption CRUD, P1 voting, P3 generated/manual caption comparison.

### Pathway 8: Humor Flavor and Prompt Chain Management

Purpose: Verify Project 3 prompt templates are fully manageable by superadmins.

Scenarios:

1. Superadmin opens `/admin/humor-flavors`.
2. Existing flavors load with description, slug, and date.
3. Admin creates a humor flavor.
4. Flavor description persists.
5. Flavor slug persists.
6. Admin edits flavor description.
7. Admin edits flavor slug.
8. Admin deletes flavor.
9. Flavor delete cascades to associated steps.
10. Duplicate flavor workflow opens.
11. Duplicate flavor copies prompt-chain structure.
12. Duplicate flavor receives independent identity and slug.
13. Flavor list updates after create/edit/delete.
14. Errors are handled without losing existing data.

Project coverage: P3 humor flavor CRUD and P2 superadmin containment.

### Pathway 9: Prompt Chain Configuration and LLM Testing

Purpose: Verify the prompt-chain authoring and test loop used for caption generation.

Scenarios:

1. Superadmin opens `/admin/llm-prompt-chains`.
2. Chain steps display in order.
3. Step model configuration displays.
4. Step temperature configuration displays.
5. Step input/output types display.
6. Admin creates a prompt-chain step.
7. Admin edits a prompt-chain step.
8. Admin deletes a prompt-chain step.
9. Admin reorders steps.
10. Prompt-chain changes persist.
11. Superadmin opens `/admin/humor-flavors/create-test`.
12. Admin selects an image for testing.
13. Admin selects a flavor for testing.
14. Test execution calls the LLM pipeline.
15. Test result displays generated caption.
16. Test result displays model metadata.
17. Test result displays processing feedback.
18. Test run does not mutate production captions unless explicitly saved.

Project coverage: P3 prompt-chain system, P2 admin UI and authorization.

### Pathway 10: Cross-Project Integration and Data Integrity

Purpose: Verify P1, P2, and P3 work together as one application.

Scenarios:

1. User vote appears in admin vote totals.
2. User vote appears in caption analytics.
3. Admin image visibility change affects gallery.
4. Admin caption edit affects gallery.
5. Admin caption delete removes gallery caption.
6. Upload creates image data visible to admin.
7. Upload triggers prompt-chain caption generation.
8. Generated captions appear in gallery.
9. Generated captions appear in admin caption list.
10. Humor flavor changes affect future generation.
11. LLM responses are stored for analytics.
12. Cascade deletes leave no orphaned captions.
13. Cascade deletes leave no orphaned votes.
14. RLS prevents unauthorized data access.
15. Environment variables remain server-side.
16. Production build compiles all route surfaces.
17. Application remains responsive during data operations.
18. Error states do not expose secrets.
19. Mobile layout remains usable across core routes.
20. Dark mode remains readable across core routes.

Project coverage: P1 + P2 + P3 full-system integration.

## Scenario Totals

The final test suite and manual verification cover 222+ scenarios across the combined system:

- Project 1: 36+ scenarios for authentication, gallery, upload, voting, UI, and build readiness
- Project 2: 72+ scenarios for admin auth, dashboard, CRUD operations, data integrity, and UI quality
- Project 3: 78+ scenarios for humor flavors, prompt chains, LLM integration, duplication, analytics, and admin UX
- Full-system integration: 72+ cross-project scenarios validating end-to-end workflows and production readiness

Some scenarios intentionally overlap between project-specific and integration testing because the same behavior must be verified both in isolation and through the complete user workflow.

## Integration Points

- P1 to P2: User votes and gallery content feed admin analytics, caption metrics, and moderation surfaces.
- P1 to P3: Uploads and gallery display consume captions generated by prompt-chain humor flavors.
- P2 to P1: Admin image/caption visibility and CRUD operations directly affect the public gallery.
- P2 to P3: Superadmin tools manage humor flavors, prompt chains, duplication, testing, and analytics.
- P3 to P2: LLM responses and generated captions appear in admin caption and analytics views.
- P3 to P1: Generated captions become votable content in the gallery.

## Referenced Detailed Test Documentation

- `P1_TESTING_FINDINGS_SUMMARY.md`
- `P2_TESTING_FINDINGS_SUMMARY.md`
- `P3_TESTING_FINDINGS_SUMMARY.md`
- `FULL_SYSTEM_INTEGRATION_TESTING.md`
- `FINAL_SUBMISSION_SUMMARY.md`
- `README_TESTING.md`
- `TESTING_QUICK_START.md`

## Acceptance Criteria

- All protected routes enforce authentication.
- Superadmin-only routes enforce `is_superadmin` authorization.
- Gallery, upload, voting, admin CRUD, humor flavors, prompt chains, and LLM testing work as integrated workflows.
- Supabase reads and mutations persist correctly.
- Cascade deletes maintain data integrity.
- Build completes with zero TypeScript errors.
- Deployed production URL is available at https://humor-final.vercel.app/login.

