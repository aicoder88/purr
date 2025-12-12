/**
 * Type definition for blog draft data stored in localStorage
 * Used with useAutoSave hook for type-safe access to draft properties
 */
export interface BlogDraftData {
    title?: string;
    content?: string;
    excerpt?: string;
    selectedCategories?: string[];
    selectedTags?: string[];
    featuredImage?: string;
    status?: 'draft' | 'published' | 'scheduled';
    scheduledDate?: string;
}
